SceneManager = require "./Manager/SceneManager.coffee"

class Engine
    constructor: ->
        @lastGameTick = Date.now()

    start: (scene) ->
        SceneManager.add "boot", scene
        scene.init()
        SceneManager.activate "boot"
        @mainLoop()

    mainLoop: ->
        requestAnimationFrame @mainLoop.bind @

        @currentGameTick = Date.now()
        @delta = @currentGameTick - @lastGameTick
        @lastGameTick = @currentGameTick

        @update @delta
        return null

    update: (dt) ->
        scene = SceneManager.current()

        for system in scene.systems
            system.update dt
        return null


module.exports = Engine