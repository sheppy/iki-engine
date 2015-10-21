/*eslint-env node */

import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import config from "./config";

var plugins = gulpLoadPlugins();

gulp.task("vendor", () => {
    return gulp
        .pipe(plugins.plumber())
        .src([
            "node_modules/lodash/index.js",
            "node_modules/pixi.js/bin/pixi.js",
            "node_modules/fpsmeter/dist/fpsmeter.js"
        ])
        .pipe(plugins.concat("vendor.js"))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.dir.dist));
});
