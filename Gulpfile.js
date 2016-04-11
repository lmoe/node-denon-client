const gulp = require('gulp');
const mocha = require('gulp-mocha');
const yuidoc = require("gulp-yuidoc");

gulp.task('test', function () {
	return gulp.src('./tests/*.js', {read: false})
		// gulp-mocha needs filepaths so you can't have any plugins before it
		.pipe(mocha({reporter: 'nyan'}));
});
