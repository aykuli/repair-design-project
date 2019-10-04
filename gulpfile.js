const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const del = require('del');
const runSequence = require('run-sequence');

//generating css/style.css from sass/style.scss
gulp.task('sass', function(done) {
    gulp.src("sass/style.scss")
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
          autoprefixer()
        ]))
        .pipe(gulp.dest("css/"))
        .pipe(browserSync.stream());
    done();
});

gulp.task('assets', function() {
  return gulp.src('assets/**/*')
  .pipe(gulp.dest('build/asssets/'))
})

//wathing changes on *.html, *.scss source files
//and reloading browser if yes
gulp.task('serve', function() {
    browserSync.init({
        server: ".",
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
    gulp.watch('source/img/*.*', gulp.series('img'))
                                .on('change', () => {
                                  browserSync.reload();
                                });
});

// clear folder build/ from old *.html/*.css when refreshing ones
gulp.task('clean:build', function(callback){
  del(['build/**/*', '!buils/assets', '!build/images/**/*'], callback)
});

gulp.task('clean', function(callback) {
  del('dist');
  return cache.clearAll(callback);
})

//main task for developing and wathing changes in browser
// gulp.task('dev',
//           gulp.series('clearBuild',
//                       gulp.parallel('sass'),
//                       'serve'));

gulp.task('build', function (callback) {
  runSequence('clean:build',
    ['sass', 'useref', 'assets'],
    callback
  )
})

