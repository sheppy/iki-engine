class InputManager
    @mouse:
        x: 0
        y: 0

    @key:
        up: false
        down: false
        left: false
        right: false

    @init: ->
        document.addEventListener "click", InputManager.mouseClick
        document.addEventListener "mousemove", InputManager.mouseMove
        document.addEventListener "keyup", InputManager.keyUp
        document.addEventListener "keydown", InputManager.keyDown

    @mouseClick: (e) -> if InputManager.onMouseClick then InputManager.onMouseClick e

    @mouseMove: (e) ->
        InputManager.mouse.x = e.x
        InputManager.mouse.y = e.y
        if InputManager.onMouseMove then InputManager.onMouseMove e

    @keyUp: (e) ->
        if e.keyCode == 38 then InputManager.key.up = false
        if e.keyCode == 40 then InputManager.key.down = false
        if e.keyCode == 37 then InputManager.key.left = false
        if e.keyCode == 39 then InputManager.key.right = false

        if InputManager.onKeyUp then InputManager.onKeyUp e

    @keyDown: (e) ->
        if e.keyCode == 38 then InputManager.key.up = true
        if e.keyCode == 40 then InputManager.key.down = true
        if e.keyCode == 37 then InputManager.key.left = true
        if e.keyCode == 39 then InputManager.key.right = true

        if InputManager.onKeyDown then InputManager.onKeyDown e

    @onMouseClick: (e) ->
    @onMouseMove: (e) ->
    @onKeyUp: (e) ->
    @onKeyDown: (e) ->


module.exports = InputManager