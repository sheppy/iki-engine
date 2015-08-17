/*eslint-env node */

import path from "path";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import through2 from "through2";
import browserify from "browserify";
import tsify from "tsify";
import bundleCollapser from "bundle-collapser/plugin";
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


gulp.task("example-html", () => {
    return gulp
        .src(path.join(config.dir.example, config.glob.html))
        .pipe(gulp.dest(config.dir.dist));
});

gulp.task("example", ["example-html", "example-ts"]);
