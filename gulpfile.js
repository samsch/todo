"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require("gulp-autoprefixer");

//Browserify + source map group
var browserify = require("browserify");
var watchify = require("watchify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');

//Riot
var riot = require("gulp-riot");
var riotify = require("riotify");

// add custom browserify options here
var customOpts = {
    entries: ['./src/main.js'],
    debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

gulp.task('scripts', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal
b.transform(riotify, {"modular": true})

function bundle() {
    return b.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
           // Add transformation tasks to the pipeline here.
        .pipe(sourcemaps.write('./web')) // writes .map file
        .pipe(gulp.dest('./web/js'));
}

gulp.task("default", function() {
    gulp.start('watch', 'scripts');
});

gulp.task("styles", function() {
    gulp.src('./sass/**/*.scss')
        .pipe(sass({outputStyle: "nested"}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('./web/css'));
});

gulp.task("watch", function() {
    gulp.start('scripts');
    gulp.watch("./sass/**/*.scss", ["styles"]);
    //gulp.watch("./src/riot-tags/**/*.tag", ["riot"]);
});
