const gulp = require("gulp");
const sass = require("gulp-sass");
const del = require("del");
const browserSync = require("browser-sync").create();
const config = {
  server: {
    baseDir: "./build"
  },
  tunnel: false,
  host: "localhost",
  port: 3333
};

gulp.task("html", function() {
  return gulp.src("src/*.html").pipe(gulp.dest("build/"));
});

gulp.task("script", function() {
  return gulp.src("src/scripts/*.js").pipe(gulp.dest("build/scripts/"));
});

gulp.task("clearBuild", function() {
  return del(["build/*"]);
});

gulp.task("clearHTMLCSS", function() {
  return del(["build/css/*", "*.html"]);
});

gulp.task("css", function() {
  return gulp
    .src("src/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("build/css/"));
});

gulp.task("img", function() {
  return gulp.src("src/assets/img/**/*.*").pipe(gulp.dest("build/assets/img/"));
});

gulp.task("fonts", function() {
  return gulp
    .src("src/assets/fonts/**/*.*")
    .pipe(gulp.dest("build/assets/fonts/"));
});

gulp.task('build',
  gulp.series(
      'clearBuild',
      gulp.parallel('html', 'css', 'fonts', 'img', 'script')
  )
);

gulp.task("watch", function() {
  browserSync.init(config);
  gulp
    .watch("src/sass/**/*.scss", gulp.series("css"))
    .on("change", browserSync.reload);
  gulp
    .watch("src/*.html", gulp.series("html"))
    .on("change", browserSync.reload);
  gulp
    .watch("src/scripts/*.js", gulp.series("script"))
    .on("change", browserSync.reload);
});

gulp.task("dev",
  gulp.series(
    gulp.series("clearHTMLCSS", gulp.parallel("html", "css", "script")), "watch")
);
