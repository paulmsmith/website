const gulp = require('gulp');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const config = require('../gulp_config');

function handleImages() {
  return gulp
    .src(`${config.paths.images.src}**/*`)
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
    .pipe(gulp.dest(config.paths.images.dest));
}

gulp.task('optimise:images', handleImages);
