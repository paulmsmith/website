// the environmental variable passed in (see: package.json scripts)
// For example: ENV_VAR=dev gulp
const gulp = require('gulp');
// const config = require('./app/gulp/gulp_config');

// this will load in each seperate gulp task file
// for example tasks/styles.js
require('require-dir')('./app/gulp/tasks');

// default gulp task
gulp.task('default', gulp.series(['styles']));
