module.exports = (grunt) ->
#    require("time-grunt")(grunt)
    require("load-grunt-tasks")(grunt)

    FILES =
        ENGINE:
            SRC: "src/**/*.coffee"
            TEST: "test/**/*.coffee"
            DIST: "dist/engine.js"


    grunt.initConfig
        pkg: grunt.file.readJSON "package.json"


        coffeelint:
            options:
                configFile: "coffeelint.json"
            gruntfile:
                files: [{src: "Gruntfile.coffee"}]
            engine:
                files: [
                    {src: FILES.ENGINE.SRC}
                    {src: FILES.ENGINE.TEST}
                ]


        mochacov:
            options:
                compilers: ["coffee:coffee-script/register"]
                require: ["./_specHelper.coffee"]
            engine:
                options:
                    files: [FILES.ENGINE.TEST]
                    reporter: "dot"
                    ui: "bdd"
                    "check-leaks": true
            "engine-cov":
                options:
                    files: FILES.ENGINE.TEST
                    reporter: "html-cov"
                    output: "./coverage/index.html"
            travis:
                options:
                    files: FILES.ENGINE.TEST
                    reporter: "travis-cov"


        browserify:
            options:
                debug: true
                extension: [".coffee", ".js"]
                transform: ["coffeeify"]
            engine:
                files:
                    "dist/engine.js": [ FILES.ENGINE.SRC ]


        watch:
            engine:
                files: [FILES.ENGINE.SRC, FILES.ENGINE.TEST]
                tasks: ["newer:coffeelint:engine", "mochacov:engine"]


    grunt.registerTask "test", ["coffeelint", "mochacov"]
    grunt.registerTask "default", ["test", "browserify"]