class State
    constructor: ->
        @systems = []

    addSystem: (system) ->
        @systems.push system
        return system

    init: ->
    activate: ->
    deactivate: ->

module.exports = State