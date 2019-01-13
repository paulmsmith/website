const gulp = require('gulp');
const config = require('../gulp_config');

function handleFonts() {
  return gulp.src(`${config.paths.fonts.src}**/*.*`).pipe(gulp.dest(config.paths.fonts.dest));
}

gulp.task('optimise:fonts', handleFonts);
