/*eslint-env node */

import path from "path";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import through2 from "through2";
import browserify from "browserify";
import babelify from "babelify";
import bundleCollapser from "bundle-collapser/plugin";
import config from "./config";

var plugins = gulpLoadPlugins();


// Compile JS
gulp.task("js", () => {
    var bundler = through2.obj((file, enc, next) => {
        browserify(file.path, {
            extensions: [".es6"],
            plugin: [bundleCollapser],
            bundleExternal: false   // Don't load external requires
        })
            .transform(babelify)
            .bundle((err, res) => {
                if (err) {
                    throw err;
                }
                file.contents = res;
                next(null, file);
            });
    });

    return gulp
        .src(path.join(config.dir.src, "engine/index.es6"))
        .pipe(plugins.plumber())
        .pipe(bundler)
        .pipe(plugins.rename({
            basename: "iki-engine",
            extname: ".js"
        }))
        .pipe(plugins.plumber.stop())
        .pipe(gulp.dest(config.dir.dist));
});
