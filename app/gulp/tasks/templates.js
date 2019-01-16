const gulp = require('gulp');
const shell = require('gulp-shell');
const config = require('../gulp_config');

gulp.task('build:templates', shell.task(`eleventy --config=${config.paths.eleventyConfigPath}`));
