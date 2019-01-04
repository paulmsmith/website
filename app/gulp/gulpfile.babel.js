// the environmental variable passed in (see: package.json scripts)
// For example: ENV_VAR=dev gulp
const env = process.env.ENV_VAR;
const gulp = require('gulp');

gulp.task('default', done => {
  console.log('done!');
  console.log(env);
  done();
});
