class SceneManager
    @currentScene: "boot"
    @scenes: {}

    @add: (name, scene) ->
        SceneManager.scenes[name] = scene
        return null

    @current: -> SceneManager.scenes[SceneManager.currentScene]

    @activate: (name, args...) ->
        old = SceneManager.current()
        old.deactivate() if old
        SceneManager.currentScene = name
        SceneManager.onActivate name
        SceneManager.current()?.activate.apply SceneManager.current(), args
        return null

    @onActivate: (name) -> # User level hook


module.exports = SceneManager