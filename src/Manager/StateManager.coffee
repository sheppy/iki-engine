class StateManager
    @currentState: "boot"
    @states: {}

    @add: (name, state) ->
        StateManager.states[name] = state
        return null

    @current: -> StateManager.states[StateManager.currentState]

    @activate: (name) ->
        old = StateManager.current()
        old.deactivate() if old
        StateManager.currentState = name
        StateManager.onActivate name
        StateManager.current().activate()
        return null

    @onActivate: (name) ->
        #console.log "StateManager > onActivate > #{name}"


module.exports = StateManager