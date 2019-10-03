var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
const del = require('del');
const concat = require('gulp-concat');

//placing *.html files in build/ dir
gulp.task('html', function (htmlBuild) {
    gulp.src('*.html')
        .pipe(gulp.dest('build/'));
    htmlBuild();
});

//generating build/css/style.css from source/sass/style.scss
gulp.task('sass', function(done) {
    gulp.src("sass/style.scss")
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
          autoprefixer()
        ]))
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream());
    done();
});

gulp.task('img', () => {
  gulp.src('img/*.*')
      .pipe(gulp.dest('build/img/'));
});

//wathing changes on *.html, *.scss source files
//and reloading browser if yes
gulp.task('serve', function(done) {
    browserSync.init({
        server: "./build",
        open: true
    });

    gulp.watch('sass/*.scss', gulp.series('sass'))
                                .on('change', () => {
                                  browserSync.reload();
                                });
    gulp.watch('sass/blocks/*.scss', gulp.series('sass'))
                                .on('change', () => {
                                  browserSync.reload();
                                });
    gulp.watch('*.html', gulp.series('html'))
                                .on('change', () => {
                                  browserSync.reload();
                                });
    gulp.watch('img/*.*', gulp.series('img'))
                                .on('change', () => {
                                  browserSync.reload();
                                });
    done();
});

// clear folder build/ from old *.html/*.css when refreshing ones
gulp.task('clearBuild', function() {
  return del(['build/*.html',
              'build/css/style.css'
            ])
});


//main task for developing and wathing changes in browser
gulp.task('dev',
          gulp.series('clearBuild',
                      gulp.parallel('sass', 'html', 'img'),
                      'serve'
                      ));






