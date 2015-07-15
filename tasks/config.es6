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
        gulpfile: "gulpfile.js",
        esLint: ".eslintrc"
    }
};
