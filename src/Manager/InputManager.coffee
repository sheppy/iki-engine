class InputManager
    @mouse:
        x: 0
        y: 0

    @init: ->
        document.addEventListener "click", InputManager.mouseClick
        document.addEventListener "mousemove", InputManager.mouseMove
#        document.addEventListener "keyup", InputManager.keyUp
#        document.addEventListener "keydown", InputManager.keyDown

    @mouseClick: (e) -> if InputManager.onMouseClick then InputManager.onMouseClick e

    @mouseMove: (e) ->
        InputManager.mouse.x = e.x
        InputManager.mouse.y = e.y
        if InputManager.onMouseMove then InputManager.onMouseMove e


    @onMouseClick: (e) ->
    @onMouseMove: (e) ->
#    @onKeyDown: (e) ->
#    @onKeyUp: (e) ->



module.exports = InputManager