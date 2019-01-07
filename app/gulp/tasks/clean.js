const gulp = require('gulp');
const del = require('del');
const config = require('../gulp_config');

function clean() {
  return del(`${config.paths.dest}`);
}

gulp.task('clean', clean);
