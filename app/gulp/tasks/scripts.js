const gulp = require('gulp');
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const utilFunctions = require('../gulp_utils');
const config = require('../gulp_config');

function generateScripts(settings) {
  console.log(settings);

  return gulp
    .src(settings.src)
    .pipe(plumber({ errorHandler: utilFunctions.onError }))
    .pipe(concat(settings.outputFile))
    .pipe(gulpIf(config.isNotLocal, uglify()))
    .pipe(gulp.dest(settings.dest));
}

gulp.task('compile:scripts', done => {
  generateScripts({
    src: config.paths.scripts.src.map(element => `${element}/**/[!_]*.js`),
    outputFile: config.paths.scripts.outputFile,
    dest: config.paths.scripts.dest
  });
  done();
});