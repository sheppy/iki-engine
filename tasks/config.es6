/*eslint-env node */

export default {
    glob: {
        html: "**/*.html",
        jade: "**/*.jade",
        css: "**/*.css",
        scss: "**/*.scss",
        es6: "**/*.es6",
        js: "**/*.js",
        ts: "**/*.ts",
        json: "**/*.json"
    },
    dir: {
        src: "src",
        dist: "lib",
        example: "example",
        tests: "test",
        tasks: "tasks",
        coverage: "coverage",
        nodeModules: "node_modules"
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
