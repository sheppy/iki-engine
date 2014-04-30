class InputManager
    @CLICK_MOVE_THRESHOLD: 3

    @MOUSE_TRANSFORM_RECT: false
    @MOUSE_TRANSFORM_WIDTH: false
    @MOUSE_TRANSFORM_HEIGHT: false
    @MOUSE_OFFSET_X: false
    @MOUSE_OFFSET_Y: false

    @mouse:
        x: 0
        y: 0
        down: false
        downX: 0
        downY: 0

    @key:
        up: false
        down: false
        left: false
        right: false

    @init: (element = document) ->
        element.addEventListener "click", InputManager.mouseClick

        element.addEventListener "mousedown", InputManager.mouseDown
        element.addEventListener "touchstart", InputManager.mouseDown

        element.addEventListener "mouseup", InputManager.mouseUp
        element.addEventListener "touchend", InputManager.mouseUp

        element.addEventListener "mousemove", InputManager.mouseMove
        element.addEventListener "touchmove", InputManager.mouseMove

        element.addEventListener "keyup", InputManager.keyUp
        element.addEventListener "keydown", InputManager.keyDown

    @mouseClick: (e) ->
        x = InputManager.transformMouseX e.x
        y = InputManager.transformMouseY e.y
        moveX = Math.abs InputManager.mouse.downX - x
        moveY = Math.abs InputManager.mouse.downY - y
        if moveX < InputManager.CLICK_MOVE_THRESHOLD && moveY < InputManager.CLICK_MOVE_THRESHOLD
            InputManager.onMouseClick? {x:x, y:y}

    @mouseDown: (e) ->
        if e.changedTouches
            x = e.changedTouches[0].pageX
            y = e.changedTouches[0].pageY
        else
            x = e.x
            y = e.y
        InputManager.mouse.x = InputManager.mouse.downX = InputManager.transformMouseX x
        InputManager.mouse.y = InputManager.mouse.downY = InputManager.transformMouseY y
        InputManager.mouse.down = true

    @mouseUp: (e) ->
        if e.changedTouches
            x = e.changedTouches[0].pageX
            y = e.changedTouches[0].pageY
        else
            x = e.x
            y = e.y
        InputManager.mouse.x = InputManager.transformMouseX x
        InputManager.mouse.y = InputManager.transformMouseY y
        InputManager.mouse.down = false

    @mouseMove: (e) ->
        if e.changedTouches
            x = e.changedTouches[0].pageX
            y = e.changedTouches[0].pageY
        else
            x = e.x
            y = e.y
        InputManager.mouse.x = x = InputManager.transformMouseX x
        InputManager.mouse.y = y = InputManager.transformMouseY y

#        InputManager.mouse.down = false
        InputManager.onMouseMove? {x:x, y:y}
        e.preventDefault()

    @keyUp: (e) ->
        if e.keyCode == 38 then InputManager.key.up = false
        if e.keyCode == 40 then InputManager.key.down = false
        if e.keyCode == 37 then InputManager.key.left = false
        if e.keyCode == 39 then InputManager.key.right = false

        InputManager.onKeyUp? e

    @keyDown: (e) ->
        if e.keyCode == 38 then InputManager.key.up = true
        if e.keyCode == 40 then InputManager.key.down = true
        if e.keyCode == 37 then InputManager.key.left = true
        if e.keyCode == 39 then InputManager.key.right = true

        InputManager.onKeyDown? e

    @onMouseClick: (e) -> # User level hook
    @onMouseMove: (e) -> # User level hook
    @onKeyUp: (e) -> # User level hook
    @onKeyDown: (e) -> # User level hook

    @transformMouseX: (x) ->
        if InputManager.MOUSE_TRANSFORM_RECT && InputManager.MOUSE_TRANSFORM_WIDTH
            x = (x / InputManager.MOUSE_TRANSFORM_RECT.right) * InputManager.MOUSE_TRANSFORM_WIDTH
        if InputManager.MOUSE_OFFSET_X then x -= InputManager.MOUSE_OFFSET_X
        return x

    @transformMouseY: (y) ->
        if @MOUSE_TRANSFORM_RECT && @MOUSE_TRANSFORM_HEIGHT
            y = (y / @MOUSE_TRANSFORM_RECT.bottom) * @MOUSE_TRANSFORM_HEIGHT
        if InputManager.MOUSE_OFFSET_Y then y -= InputManager.MOUSE_OFFSET_Y
        return y


module.exports = InputManager
