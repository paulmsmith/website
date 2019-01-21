const notify = require('gulp-notify');

// Error notification
function onError(err) {
  notify.onError({
    title: 'Gulp',
    subtitle: 'Failure!',
    message: 'Error: <%= error.message %>',
    sound: 'Beep'
  })(err);
  this.emit('end');
}

module.exports = {
  onError
};
