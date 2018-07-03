var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourceMaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task("html", function () {
    return gulp.src("./src/index.html")
        .pipe(gulp.dest("./build"))
        .pipe(reload({stream: true}));
});

gulp.task("scss", function () {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(sassGlob())
        .pipe(sourceMaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(concat("style.css"))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest("./build/css/"))
        .pipe(reload({stream: true}))
});

gulp.task("js", function () {
    return gulp.src("./src/js/**/*.js")
        .pipe(sourceMaps.init())
        .pipe(concat("main.js"))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest("./build/js"))
        .pipe(reload({stream: true}))
});

gulp.task("fonts", function () {
    return gulp.src("./src/fonts/**/*")
        .pipe(gulp.dest("./build/fonts/"));
});

gulp.task("images", function () {
    return gulp.src("./src/images/**/*")
        .pipe(cache(imagemin([
            imagemin.gifsicle({interlaced: true}), //сжатие .gif
            imagemin.jpegtran({progressive: true}), //сжатие .jpeg
            imagemin.optipng({optimizationLevel: 5}), //сжатие .png
            imagemin.svgo({                         // сжатие .svg
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })

        ])))
            .pipe(gulp.dest("./build/images/"))
            .pipe(reload({stream: true}));

});

gulp.task("clean", function () {
    return gulp.src("./build")
        .pipe(clean());
});

gulp.task("clear-cache",function () {
    cache.clearAll()
});

gulp.task("build",["images","fonts","html", "scss", "js"]);

gulp.task("watch", function () {
    gulp.watch("./src/index.html", ["html"]);
    gulp.watch("./src/scss/**/*.scss", ["scss"]);
    gulp.watch("./src/js/**/*.js", ["js"]);

});

gulp.task("browser-sync", function () {
    browserSync({
        startPath:"/",
        server:{
            baseDir:"build"
        },
        notify:false
    });

});

gulp.task("server",["build", "browser-sync", "watch"]);

gulp.task("default", ["build"]);