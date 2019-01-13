// the environmental variable passed in (see: package.json scripts)
// For example: ENV_VAR=dev gulp
const gulp = require('gulp');
// const config = require('./app/gulp/gulp_config');

// this will load in each seperate gulp task file
// for example tasks/styles.js
require('require-dir')('./app/gulp/tasks');

// run the content compilation tasks
gulp.task('compile:content', gulp.series('build:templates'));

// compile all the front-end assets
gulp.task(
  'compile:assets',
  gulp.parallel('compile:stylesheets', 'optimise:images', 'optimise:fonts', 'compile:scripts')
);

// generate all the things
gulp.task('build', gulp.series('clean', 'compile:assets', 'compile:content'));

// serve site
gulp.task('serve', gulp.series('run:localserver'));

// run everything locally
gulp.task('run:local', gulp.series(['build', 'serve']));

// default gulp task
gulp.task('default', gulp.series(['run:local']));
