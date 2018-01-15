var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlReaplce = require('gulp-html-replace');
var htmlMin = require('gulp-htmlmin');
var del = require('del');
var sequence = require('run-sequence');
var stripCssComments = require('gulp-strip-css-comments');
var removeHtml = require('gulp-remove-html');

var config = {
	dist: 'dist/',
	src: 'src/',
	cssin: 'src/assets/css/style.css',
	jsinjQ: 'src/assets/js/jquery.min.js',
	jsinPopper: 'src/assets/js/popper.js',
	jsinBS: 'src/assets/js/bootstrap.js',
	jsinScript: 'src/assets/js/scripts.js',
	jsinValidator: 'src/assets/js/validator.min.js',
	jsinForm: 'src/assets/js/form-scripts.js',
	imgin: 'src/assets/img/**/*.{jpg,jpeg,png,gif,svg}',
	htmlin: 'src/*.html',
	scssin: 'src/assets/scss/**/*.scss',
	cssout: 'dist/assets/css/',
	jsout: 'dist/assets/js/',
	imgout: 'dist/assets/img/',
	htmlout: 'dist/',
	scssout: 'src/assets/css/',
	cssoutname: 'style.css',
	jsoutname: 'scripts.js',
	cssreplaceout: 'assets/css/style.css',
	jsreplaceout: 'assets/js/scripts.js',
	phpin: 'src/assets/php/*.{php}',
	phpout: 'dist/assets/php/'
};

gulp.task('reload', function () {
	browserSync.reload();
});

gulp.task('serve', ['sass'], function () {
	browserSync({
		server: config.src
	});
	gulp.watch([config.htmlin, config.jsinjQ, config.jsinPopper, config.jsinBS, config.jsinScript, config.jsinValidator, config.jsinForm], ['reload']);
	gulp.watch(config.scssin, ['sass']);
});

gulp.task('sass', function () {
	return gulp.src(config.scssin)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 versions']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.scssout))
		.pipe(browserSync.stream());
});

gulp.task('sass-build', function () {
	return gulp.src(config.scssin)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 versions']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.scssout));
});

gulp.task('css', function () {
	return gulp.src(config.cssin)
		.pipe(concat(config.cssoutname))
		.pipe(stripCssComments({
			preserve: false
		}))
		.pipe(cleanCSS({level: {1: {specialComments: 0}}}))
		.pipe(gulp.dest(config.cssout));
});

gulp.task('js', function () {
	return gulp.src([config.jsinjQ, config.jsinPopper, config.jsinBS, config.jsinScript, config.jsinValidator, config.jsinForm])
		.pipe(concat(config.jsoutname))
		.pipe(uglify())
		.pipe(gulp.dest(config.jsout));
});

gulp.task('img', function () {
	return gulp.src(config.imgin)
		.pipe(gulp.dest(config.imgout));
});

gulp.task('html', function () {
	return gulp.src(config.htmlin)
		.pipe(htmlReaplce({
			'css': config.cssreplaceout,
			'js': config.jsreplaceout
		}))
		.pipe(htmlMin({
			sortAttributes: true,
			sortClassName: true,
			collapseWhitespace: false,
			conservativeCollapse: true,
			removeComments: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true
		}))
		.pipe(gulp.dest(config.dist))
});

gulp.task('html-build', function () {
	return gulp.src(config.htmlin)
		.pipe(htmlReaplce({
			'css': config.cssreplaceout,
			'js': config.jsreplaceout
		}))
		.pipe(removeHtml())
		.pipe(htmlMin({
			sortAttributes: true,
			sortClassName: true,
			collapseWhitespace: true,
			conservativeCollapse: true,
			removeComments: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true
		}))
		.pipe(gulp.dest(config.dist))
});

gulp.task('phpcopy', function () {
	gulp.src(config.phpin)
		.pipe(gulp.dest(config.phpout));
});

gulp.task('clean', function () {
	return del([config.dist]);
});

gulp.task('build', function () {
	sequence('clean', ['html-build', 'css', 'js', 'img', 'phpcopy']);
});


gulp.task('default', ['serve']);
