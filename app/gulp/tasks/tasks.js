const gulp = require('gulp');

gulp.task('compile:content', gulp.series('templates'));

// compile all the front-end assets
gulp.task('compile:assets', gulp.parallel('styles', 'images', 'fonts', 'scripts'));

// generate all the things
gulp.task('build', gulp.series('clean', 'compile:assets', 'compile:content'));

// default gulp task
gulp.task('default', gulp.series(['build', 'serve']));
