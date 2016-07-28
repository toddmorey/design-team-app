'use strict';

// gulp setup
var gulp = require('gulp');
var runSequence  = require('run-sequence');

// webpack
var webpack = require('webpack');
var gutil = require("gulp-util");
var main_dir = process.cwd();

// Webpack / Riot Configuration
var webpackOpts = {
  entry: main_dir + '/app',
  output: {
    path: main_dir + '/content/js/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ],
  module: {
    loaders: [
      { test: /\.tag$/, loader: 'tag' }
    ]
  }
};

// sass (css compliation)
var sass = require('gulp-sass');

// Metalsmith
var Metalsmith = require('./metalsmith.js');

//  BrowserSync
var browserSync = require('browser-sync');

// netlify
var config = require('./config/netlify-config.js'),
    netlify = require('netlify');

// GULP TASKS ////////////////////////////////////////

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/**/*.*")
        .pipe(sass({includePaths: [
            'scss/**/']
          , errLogToConsole: true}))
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest("content/css"))
});

// webpack of JS assets
gulp.task('webpack', function (cb) {
    webpack(
        webpackOpts,
        function(err, stats) {
          if(err) throw new gutil.PluginError("webpack", err);
          gutil.log("[webpack]", stats.toString({
            // output options
        }));
        cb();
    });
});

// Deploy site to netlify
gulp.task('build-and-deploy', ['metalsmith-prod'], function() {
  netlify.deploy({
    access_token: config.NETLIFY_ACCESS_TOKEN,
    site_id: config.NETLIFY_SITE_ID,
    dir: config.NETLIFY_SITE_DIR
  }, function(err, deploy) {
    if (err) { throw(err) }
  });
});

// Deploy site to netlify (without building first)
gulp.task('deploy', function() {
  netlify.deploy({
    access_token: config.NETLIFY_ACCESS_TOKEN,
    site_id: config.NETLIFY_SITE_ID,
    dir: config.NETLIFY_SITE_DIR
  }, function(err, deploy) {
    if (err) { throw(err) }
  });
});

gulp.task('metalsmith-dev', function(callback) {
  // run a metalsmith build in dev mode (includes metalsmith-watch plugin)
  Metalsmith('dev',callback);
});

gulp.task('metalsmith-prod', function(callback) {
  // run a metalsmith build in prod mode
  Metalsmith('prod',callback);
});

// Browsersync task
gulp.task('browsersync', function () {
  browserSync.init({
    notify: true,
    // tunnel: '',
    server: {
      baseDir: 'build'
    }
  });
});

// BrowserSync reload task
gulp.task('reload', function(callback) {
  browserSync.reload()
  callback()
});

// Watch build dir to rebuild on change
gulp.task('watch', function () {
  gulp.watch('scss/*.*', ['sass']);
  gulp.watch('app/**/*.*', ['webpack']);
  gulp.watch(['build/**/*.*'], ['reload']);
});

// Build website and run server with live reloading
gulp.task('default', function(callback) {
  runSequence(
    'sass', // Build out css from sass source files
    'metalsmith-dev', // Build the site with Metalsmith in dev mode
    'browsersync', // Fire up browsersync server
    'watch', // look for any and all changes to the build dir and reload in browser
    callback
  )
});
