var gulp = require('gulp');
var sass = require('gulp-sass');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

gulp.task('default', ['watch', 'sass', 'copy', 'templates']);

gulp.task('sass', function() {
	return gulp.src('dev/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('copy', function() {
	//gulp.src('dev/html/*.html')
	//	.pipe(gulp.dest('dist/html'));
	gulp.src('dev/js/*.js')
		.pipe(gulp.dest('dist/js'));
	gulp.src('dev/fonts/*.ttf')
		.pipe(gulp.dest('dist/fonts'));
	gulp.src('dev/img/*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('templates', function() {
	var templateData = {},
	options = {
		batch: ['./dev/hbs/partials']
	}

	return gulp.src('dev/hbs/pages/*.hbs')
		.pipe(handlebars(templateData, options))
		.pipe(rename({
			extname: '.html'
		}))
		.pipe(gulp.dest('dist/html'));
});

gulp.task('watch', function() {
	gulp.watch('dev/**/*', ['sass', 'copy', 'templates']);
  // place code for your default task here
});
