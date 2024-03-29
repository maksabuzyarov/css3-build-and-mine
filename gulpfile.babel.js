'use strict';

import gulp from 'gulp';
import yargs from 'yargs';
import requireDir from 'require-dir';

const argv = yargs.argv;
const production = !!argv.production;

const paths = {
  dist: './docs/',
  views: {
    src: './src/views/templates/**/*.html',
    pages: './src/views/templates/',
    partials: './src/views/partials/',
    helpers: './src/views/helpers/',
    data: './src/views/data',
    dist: './docs/',
    watch: './src/views/**/*.html',
  },
  styles: {
    src: './src/styles/*.{scss,sass}',
    dist: './docs/assets/styles/',
    watch: './src/styles/**/*.{scss,sass}',
  },
  fonts: {
    src: './src/fonts/**/*.{woff,woff2,eot,ttf,svg}',
    dist: './docs/assets/fonts/',
    watch: './src/fonts/**/*.{woff,woff2,eot,ttf,svg}',
  },
  favicons: {
    src: "./src/img/favicon/*.{jpg,jpeg,png,gif}",
    dist: "./docs/assets/img/favicons/",
  },
  sprites: {
    src: "./src/img/svg/*.svg",
    dist: "./docs/assets/img/sprites/",
    watch: "./src/img/svg/*.svg"
  },
  images: {
    src: [
      './src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}',
      '!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff,svg}',
    ],
    dist: './docs/assets/img/',
    watch: './src/img/**/*.{jpg,jpeg,png,gif,svg,tiff}',
  },
  scripts: {
    src: './src/js/main.js',
    dist: './docs/assets/js/',
    srcOther: './src/js/other/*.js',
    distOther: './docs/assets/js/other/',
    watch: './src/js/**/*.js',
  },
  vendors: {
    src: './src/vendors/**/*.*',
    dist: './docs/assets/vendors/'
  },
  assets: {
    dist: './docs/assets/',
  },
};

const config = {
  production: production,
  plumber: {
    errorHandler: function(error) {
      console.error(error.message);
      this.emit('end');
    }
  },
  fileInclude: {
    prefix: '@@',
    basepath: __dirname,
    context: {},
  },
};

// -------------------------------------
//   All tasks
// -------------------------------------

requireDir('./tasks/');


// -------------------------------------
//   Task: default
// -------------------------------------

gulp.task('default',
  gulp.series(gulp.parallel('styles', 'scripts', 'images', 'fonts', 'views', 'favicons', 'sprites', 'vendors'), 'server'));


// -------------------------------------
//   Task: build
// -------------------------------------

gulp.task(
  'build',
  gulp.series('clean', gulp.parallel('styles', 'scripts', 'images', 'fonts', 'views', 'favicons', 'sprites', 'vendors'), 'say:build'));

export { paths, config };
