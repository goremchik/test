var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
	minify = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	clean = require('gulp-clean'),
	changed = require('gulp-changed'), // Проверка наличия изменений в файлах
	jsonlint = require("gulp-jsonlint"), // Валидация json файлов
	csso = require('gulp-csso'),
	uncss = require('gulp-uncss'),
	fixmyjs = require("gulp-fixmyjs"),
	jscs = require('gulp-jscs'),
	imagemin = require('gulp-imagemin'),
	jsdoc = require("gulp-jsdoc"),
	htmlhint = require("gulp-htmlhint"),
	htmlmin = require('gulp-htmlmin'),
	git = require('gulp-git');
	runSequence = require('run-sequence'),

	
gulp.task('js', function () {
  return gulp.src('src/js/*.js') // Откуда брать файлы и какие
    .pipe(uglify())  // Минифмкация js
//    .pipe(concat('app.min.js')) // Обьединение файлов из src в app.min.js
    .pipe(gulp.dest('build/js/')); // Перенос в нужную папку
});

gulp.task('css', function () {
	return gulp.src('src/css/*.css')
	//.pipe(uncss({ // Поиск неиспользуемых стилей
    //    html: ['Ciklum/src/index.html', 'src/html/*.html']
    //})) // Может удалить некоторые стили, если html динамически генерируются
	.pipe(csso()) // Минифмкация css
	.pipe(autoprefixer({ browsers: ['last 2 versions'] })) // автоматическое добавление префиксов для некоторых стилей
    .pipe(gulp.dest('build/css/'));
});

gulp.task('clean', function () {
  return gulp.src(['build/*', 'Ciklum/documentation/*'], {read: false})
    .pipe(clean()); // Очистка всего из src
});

gulp.task('jsLibs', function () {
  return gulp.src('src/jsLibs/*.js')
    .pipe(gulp.dest('build/jsLibs/'));
});

gulp.task('cssLibs', function () {
  return gulp.src('src/cssLibs/*.css')
	.pipe(uncss({ 
            html: ['src/index.html', 'src/html/*.html']
        }))
    .pipe(gulp.dest('build/cssLibs/'));
});
	
gulp.task('fonts', function () {
	return gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('build/fonts/'));
});

gulp.task('img', function () {
	return gulp.src('src/img/*.*')
	.pipe(imagemin())
    .pipe(gulp.dest('build/img/'));
});


gulp.task('document', function() {
	return gulp.src(["src/js/*.js", "README.md"])
	.pipe(jsdoc.parser())
    .pipe(jsdoc.generator('documentation/'))
});

gulp.task('html', function() {
	return gulp.src(["src/html/*.html", "src/*.html"])
	.pipe(htmlhint())
    .pipe(htmlhint.reporter())
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('build/'));
});

gulp.task('jsFix', function() {
  return gulp.src('src/js/*.js')
	//.pipe(fixmyjs({emptyStatement: true})) // Исправление мелких ошибок (), но удаляет все ентеры
    .pipe(jshint()) // Проверка js на ошибки
    .pipe(jshint.reporter('default')) // Выаод ошибок в консоль
	.pipe(jscs({fix: true})) // Исправить стиль оформления
	.pipe(gulp.dest('src/js/'));
});

gulp.task('add', function() {
  return gulp.src('./*')
    .pipe(git.add());
});

gulp.task('commit', function() {
    return gulp.src('./*')
    .pipe(git.commit('initial commit'));
});

gulp.task('push', function(){
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});

//gulp.task('git', function() {
//  runSequence('add', 'commit', 'push');
//});

gulp.task('test', function() {

});

gulp.task('build', ['jsLibs' , 'cssLibs', 'js', 'css', 'img', 'html', 'fonts']);


gulp.task('default', ['clean', 'document', 'jsFix'], function() { // Вызов test после выполнения clean
	gulp.start(['test'], function() {
		gulp.start(['build'], function() {
			console.log("GIT start");
			gulp.start('add', function() {
				gulp.start('commit', function() {
					//gulp.start('push', function() {});
				});
			});
		});
	});
});