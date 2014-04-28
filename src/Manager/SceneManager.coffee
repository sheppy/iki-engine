class SceneManager
    @currentState: "boot"
    @states: {}

    @add: (name, state) ->
        SceneManager.states[name] = state
        return null

    @current: -> SceneManager.states[SceneManager.currentState]

    @activate: (name) ->
        old = SceneManager.current()
        old.deactivate() if old
        SceneManager.currentState = name
        SceneManager.onActivate name
        SceneManager.current().activate()
        return null

    @onActivate: (name) -> # User level hook


module.exports = SceneManager