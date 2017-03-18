var gulp = require("gulp");
var concat = require("gulp-concat");

gulp.task("default", function () {
  return gulp.src([
    "./fsm.js",
    "./create.js",
    "./widget.js"
  ])
    .pipe(concat("bundle.js"))
    .pipe(gulp.dest("./dist/"));
});