/*eslint-env node */

import path from "path";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import through2 from "through2";
import browserify from "browserify";
import tsify from "tsify";
import bundleCollapser from "bundle-collapser/plugin";
import browserSync from "browser-sync";
import config from "./config";

var plugins = gulpLoadPlugins();


// Compile TypeScript
gulp.task("example-ts", () => {
    var bundler = through2.obj((file, enc, next) => {
        browserify(file.path, {
            extensions: [".ts"],
            plugin: [bundleCollapser],
            bundleExternal: false   // Don't load external requires
        })
            .plugin(tsify)
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
        .pipe(plugins.plumber())
        .pipe(bundler)
        .pipe(plugins.rename({
            basename: "example",
            extname: ".js"
        }))
        .pipe(plugins.plumber.stop())
        .pipe(gulp.dest(config.dir.dist));
});

gulp.task("example-ts-watch", ["example-ts"], browserSync.reload);


// HTML tasks
gulp.task("example-html", () => {
    return gulp
        .src(path.join(config.dir.example, config.glob.html))
        .pipe(gulp.dest(config.dir.dist));
});

gulp.task("example-html-watch", ["example-html"], browserSync.reload);


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
        .src(path.join(config.dir.src, "null.png"))
        .pipe(gulp.dest(config.dir.dist));
});

// Main example app
gulp.task("example", ["example-vendor", "example-html", "example-ts"]);

gulp.task("example-server", ["example"], () => {
    browserSync.create().init({
        server: {
            baseDir: config.dir.dist,
            index: "example.html"
        },
        open: false,
        notify: false
    });

    gulp.watch([
        path.join(config.dir.example, config.glob.ts),
        path.join(config.dir.src, config.glob.ts)
    ], ["example-ts-watch"]);
    gulp.watch(path.join(config.dir.example, config.glob.html), ["example-html-watch"]);
});
