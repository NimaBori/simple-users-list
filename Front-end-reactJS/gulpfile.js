const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");

// Define a task to compile SCSS to CSS
function compileSass() {
  return gulp
    .src("./src/styles/main.scss") // Path to your main SCSS file
    .pipe(sass().on("error", sass.logError))
    .pipe(rename("index.css")) // Rename the output file
    .pipe(gulp.dest("./src/dist/css")); // Destination directory
}

// Define a watch task to automatically compile SCSS when files change
function watch() {
  gulp.watch("./src/styles/**/*.scss", compileSass);
}

// Export tasks
exports.compileSass = compileSass;
exports.watch = watch;
