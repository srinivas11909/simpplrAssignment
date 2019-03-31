const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require('browser-sync').create();
sass.compiler = require("node-sass");

// style paths
const sass_src = "./src/scss/style.scss",
  sass_files = "./src/scss/*.scss";


  var paths = {
      styles: {
          // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
          src: "src/scss/*.scss",
          // Compiled files will end up in whichever folder it's found in (partials are not compiled)
          dest: "src/css"
      }
  };


function defaultTask(cb) {
   console.log('test');
  cb();
}

function style() {
  console.log('sdda');
   return gulp.src(paths.styles.src)
     .pipe(sourcemaps.init())
     .pipe(sass())
     .on("error", sass.logError)
     .pipe(postcss([autoprefixer(), cssnano()]))
     .pipe(sourcemaps.write())
     .pipe(gulp.dest(paths.styles.dest))
     .pipe(browserSync.stream())
}

function watch(done) {
  browserSync.init({
    server: {
      baseDir: './src'
    },
    notify: true,
    open: false
    //open: 'external',
  });
  // gulp.watch(sass_src, style);
  gulp.watch(paths.styles.src, style);

  gulp.watch('src/*.html').on('change', browserSync.reload);
  done();
}


exports.default = style;
exports.watch = watch;
