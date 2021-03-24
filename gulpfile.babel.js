// the environmental variable passed in (see: package.json scripts)
// For example: ENV_VAR=dev gulp

const gulp = require('gulp');
const del = require('del');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const globImporter = require('node-sass-glob-importer');
const sassVariables = require('gulp-sass-variables');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const cp = require('child_process');
const browserSync = require('browser-sync');
const utilFunctions = require('./app/gulp/gulp.utils');
const config = require('./app/app.config');

// -----------------------------------------------------------------------------
// functions
// -----------------------------------------------------------------------------

/**
 * deletes the build directory ready for repopulation with a new version
 */
function clean() {
  return del(`${config.paths.distDir}`);
}

/**
 * initially take fonts and move them to the correct place
 */
function handleFonts() {
  return gulp
    .src(`${config.paths.fonts.src}**/*.*`)
    .pipe(gulp.dest(config.paths.fonts.dest))
    .pipe(gulpIf(config.isDev, browserSync.stream()));
}

/**
 * handle images dependant on environment
 */
function handleImages() {
  return gulp
    .src(`${config.paths.images.src}**/**`)
    .pipe(
      gulpIf(
        config.isNotLocal,
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.jpegtran({ progressive: true }),
          imagemin.optipng({ optimizationLevel: 7 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
          })
        ])
      )
    )
    .pipe(gulp.dest(config.paths.images.dest))
    .pipe(gulpIf(config.isDev, browserSync.stream()));
}

/**
 *
 * @param {Obj} settings object
 */
function generateScripts(settings) {
  return gulp
    .src(settings.src)
    .pipe(plumber({ errorHandler: utilFunctions.onError }))
    .pipe(concat(settings.outputFile))
    .pipe(gulpIf(config.isNotLocal, uglify()))
    .pipe(gulp.dest(settings.dest))
    .pipe(gulpIf(config.isDev, browserSync.stream()));
}

/**
 * generate css files using sass and some gulp plugins
 */
function generateStylesheets() {
  return gulp
    .src(config.paths.stylesheets.src.map(element => `${element}/**/*.scss`))
    .pipe(plumber({ errorHandler: utilFunctions.onError }))
    .pipe(
      sassVariables({
        $env: config.currentEnv,
        $assetsURLDev: config.envs.development.assetsURL,
        $assetsURLProd: config.envs.production.assetsURL
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        importer: globImporter(),
        outputStyle: 'expanded',
        includePaths: [
          `./node_modules/sass-mq/`,
          `./node_modules/rfs/`,
          config.paths.sourceDir,
          `${config.paths.sourceDir}/www/_templates/`
        ]
      })
    )
    .pipe(autoprefixer(config.prefixBrowsers))
    .pipe(gulpIf(!config.isNotLocal, sourcemaps.write()))
    .pipe(
      gulpIf(
        config.isNotLocal,
        cleanCSS({ debug: true, compatibility: 'ie8' }, details => {
          // eslint-disable-next-line no-console
          console.log(`${details.name}: ${details.stats.originalSize}`);
          // eslint-disable-next-line no-console
          console.log(`${details.name}: ${details.stats.minifiedSize}`);
        })
      )
    )
    .pipe(gulp.dest(config.paths.stylesheets.dest))
    .pipe(gulpIf(config.isDev, browserSync.stream()));
}

function buildTemplates(done) {
  return cp
    .spawn(
      `eleventy`,
      [
        `--config=${config.paths.eleventyConfigPath}`
        // `--port=${config.envs.development.port}`
      ],
      {
        cwd: process.cwd(),
        detached: true,
        stdio: 'inherit'
      }
    )
    .on('close', code => {
      if (code === 0) {
        browserSync.reload();
        done();
      } else {
        // eslint-disable-next-line no-console
        console.error(`build failed with code ${code}`);
        browserSync.notify('build failed 😞');
        done();
      }
    });
}

/**
 * loops over an array of watcher objects to create a gulp watch task
 * for each of them
 */
function watch() {
  const watchers = [
    {
      glob: config.paths.templates.src.map(
        element => `${element}/**/{*.html,*.njk,*.md,*.js}`
      ),
      tasks: ['build:templates']
    },
    {
      glob: config.paths.stylesheets.src.map(element => `${element}/**/*.scss`),
      tasks: ['compile:stylesheets']
    },
    {
      glob: `${config.paths.images.src}**/*`,
      tasks: ['optimise:images']
    },
    {
      glob: `${config.paths.scripts.src}**/*`,
      tasks: ['compile:scripts']
    }
  ];

  watchers.forEach(watcher => {
    gulp.watch(watcher.glob, gulp.series(watcher.tasks));
  });
}

/**
 * local serve function. starts browsersync session and fires the watch
 */
function serve() {
  browserSync({
    notify: false,
    server: [config.paths.distDir],
    tunnel: false,
    open: false,
    port: config.envs.development.port || '3000'
  });
  watch();
}

// -----------------------------------------------------------------------------
// gulp tasks
// -----------------------------------------------------------------------------

gulp.task('clean', clean);
gulp.task('optimise:fonts', handleFonts);
gulp.task('optimise:images', handleImages);

gulp.task('compile:scripts', done => {
  generateScripts({
    src: config.paths.scripts.src.map(element => `${element}/**/[!_]*.js`),
    outputFile: config.paths.scripts.outputFile,
    dest: config.paths.scripts.dest
  });
  done();
});

gulp.task('compile:stylesheets', generateStylesheets);
gulp.task('build:templates', buildTemplates);
gulp.task('compile:content', gulp.series('build:templates'));

// compile all the front-end assets
gulp.task(
  'compile:assets',
  gulp.parallel(
    'compile:stylesheets',
    'optimise:images',
    'optimise:fonts',
    'compile:scripts'
  )
);

// generate all the things
gulp.task('build', gulp.series('clean', 'compile:assets', 'compile:content'));

// serve the build directory locally
gulp.task('serve', serve);

// run everything locally
gulp.task('run:local', gulp.series(['build', 'serve']));

// default gulp task
gulp.task('default', gulp.series(['run:local']));
