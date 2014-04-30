System = require "../System.coffee"
EntityManager = require "../Manager/EntityManager.coffee"
GraphicsManager = require "../Manager/GraphicsManager.coffee"
InputManager = require "../Manager/InputManager.coffee"

class UserInterfaceSystem extends System
    THROTTLE_VALUE: 16

    init: (@renderer) ->

    onUpdate: ->
#        @renderer.ctx.clearRect 0, 0, @width, @height

#        @drawRects()
#        @drawImages()
#        @drawTexts()




module.exports = UserInterfaceSystem