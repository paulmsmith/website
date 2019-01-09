const gulp = require('gulp');
const browserSync = require('browser-sync');
const config = require('./gulp_config');

const { reload } = browserSync;

function watch(callback) {
  const watchers = [
    {
      glob: config.paths.templates.src.map(element => `${element}**/{*.html,*.njk,*.md}`),
      tasks: ['build:templates']
    },
    {
      glob: [`${config.paths.stylesheets.src}**/*.scss`],
      tasks: ['compile:stylesheets']
    },
    {
      glob: `${config.paths.images.src}**/*`,
      tasks: ['optimise:images']
    },
    {
      glob: `${config.paths.src.js}**/*`,
      tasks: ['scripts']
    }
  ];

  watchers.forEach(watcher => {
    if (callback) {
      watcher.tasks.push(callback);
    }
    gulp.watch(watcher.glob, watcher.tasks);
  });
}

function serve() {
  browserSync({
    notify: false,
    server: [config.paths.dest],
    tunnel: false,
    open: false
  });
  watch(reload);
}

gulp.task('run:localserver', serve);
