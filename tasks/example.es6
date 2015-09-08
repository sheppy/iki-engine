/*eslint-env node */

import path from "path";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import through2 from "through2";
import browserify from "browserify";
import babelify from "babelify";
import tsify from "tsify";
import bundleCollapser from "bundle-collapser/plugin";
import browserSync from "browser-sync";
import config from "./config";

var plugins = gulpLoadPlugins();

var browserSyncServer = browserSync.create();

var onError = function(err) {
    console.error(err);
    this.emit('end');
};

// Compile TypeScript
gulp.task("example-ts", () => {
    var bundler = through2.obj((file, enc, next) => {
        browserify(file.path, {
            debug: true,
            extensions: [".ts"],
            bundleExternal: false   // Don't load external requires
        })
            .plugin(tsify, {
                rootDir: './',
                sourceRoot: './'
            })
            .plugin(bundleCollapser)
            .bundle((err, res) => {
                if (err) {
                    throw err;
                }
                file.contents = res;
                next(null, file);
            });
    });

    return gulp
        .src(path.join(config.dir.example, "example.ts"))
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(bundler)
        .pipe(plugins.rename({
            basename: "example",
            extname: ".js"
        }))
        .pipe(plugins.plumber.stop())
        .pipe(gulp.dest(config.dir.dist));
});


// HTML tasks
gulp.task("example-html", () => {
    return gulp
        .src(path.join(config.dir.example, config.glob.html))
        .pipe(gulp.dest(config.dir.dist));
});


// Vendor JS
gulp.task("example-vendor", () => {
    return gulp
        .src([
            "node_modules/pixi.js/bin/pixi.js",
            "node_modules/fpsmeter/dist/fpsmeter.js"
        ])
        .pipe(gulp.dest(config.dir.dist));
});


// Assets
gulp.task("example-assets", () => {
    return gulp
        .src([
            path.join(config.dir.example, "assets/**/*"),
            path.join(config.dir.src, "null.png")
        ])
        .pipe(gulp.dest(config.dir.dist));
});

// Main example app
gulp.task("example", ["example-vendor", "example-html", "example-ts"]);

gulp.task("example-server", ["example"], () => {
    browserSyncServer.init({
        server: {
            baseDir: config.dir.dist,
            index: "example.html"
        },
        open: false,
        notify: true
    });

    gulp.watch([
        path.join(config.dir.example, config.glob.ts),
        path.join(config.dir.src, config.glob.ts)
    ], ["example-ts", browserSyncServer.reload]);
    gulp.watch(path.join(config.dir.example, config.glob.html), ["example-html", browserSyncServer.reload]);
});
