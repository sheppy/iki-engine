/*eslint-env node */

export default {
    glob: {
        html: "**/*.html",
        jade: "**/*.jade",
        css: "**/*.css",
        scss: "**/*.scss",
        es6: "**/*.es6",
        js: "**/*.js",
        json: "**/*.json"
    },
    dir: {
        src: "src",
        dist: "lib",
        tests: "test",
        tasks: "tasks",
        coverage: "coverage"
    },
    file: {
        vendorJs: "vendor.js",
        gulpfile: "gulpfile.js",
        esLint: ".eslintrc"
    },

    libs: [
        "pixi.js"
    ]
};
