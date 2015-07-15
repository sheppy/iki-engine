/*eslint-env node */

import path from "path";
import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import {Instrumenter} from "isparta";
import config from "./config";

var plugins = gulpLoadPlugins();

// Tests and coverage
gulp.task("test", (cb) => {
    return gulp
        .src(path.join(config.dir.src, config.glob.es6))
        .pipe(plugins.plumber())
        .pipe(plugins.istanbul({
            instrumenter: Instrumenter,
            includeUntested: true
        }))
        .pipe(plugins.istanbul.hookRequire())
        .on("finish", () => {
            return gulp
                .src(path.join(config.dir.tests, config.glob.es6), { read: false })
                .pipe(plugins.plumber())
                .pipe(plugins.mocha({ reporter: "spec" }))
                .pipe(plugins.istanbul.writeReports({
                    dir: config.dir.coverage,
                    reportOpts: { dir: config.dir.coverage },
                    reporters: ["text-summary", "json", "html"]
                }))
                .pipe(plugins.istanbulEnforcer({
                    thresholds: {
                        statements: 80,
                        branches: 50,
                        lines: 75,
                        functions: 50
                    },
                    coverageDirectory: config.dir.coverage,
                    rootDirectory: ""
                }))
                .pipe(plugins.plumber.stop())
                .on("end", cb)
        })
        .pipe(plugins.plumber.stop())
});
