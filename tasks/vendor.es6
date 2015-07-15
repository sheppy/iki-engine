/*eslint-env node */

import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import browserify from "browserify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import bundleCollapser from "bundle-collapser/plugin";
import config from "./config";

var plugins = gulpLoadPlugins();

gulp.task("vendor", function () {
    var b = browserify({
        debug: false,
        plugin: [bundleCollapser]
    });

    config.libs.forEach(function (lib) {
        b.require(lib);
    });

    return b.bundle()
        .pipe(plugins.plumber())
        .pipe(source(config.file.vendorJs))
        .pipe(buffer())
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.dir.dist));
});
