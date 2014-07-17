System = require "../System.coffee"
EntityManager = require "../Manager/EntityManager.coffee"
GraphicsManager = require "../Manager/GraphicsManager.coffee"

class GraphicsSystem extends System
    THROTTLE_VALUE: 16

    init: (@renderer) ->
        @viewportX = 0
        @viewportY = 0

        @buffer = @renderer

#        @buffer = GraphicsManager.createRenderer @width, @height

    onBeforeDraw: (ctx, dt) ->
    onAfterDraw: (ctx, dt) ->

    onUpdate: (dt) ->
        @renderer.ctx.clearRect 0, 0, @renderer.canvas.width, @renderer.canvas.height
        @onBeforeDraw @renderer.ctx, dt
#        @onBeforeDraw @buffer.ctx, dt

        @drawRects()
        @drawImages()
        @drawTexts()

        @onAfterDraw @renderer.ctx, dt
#        @onAfterDraw @buffer.ctx, dt

        # Draw copy the buffer to main renderer
#        @renderer.ctx.clearRect 0, 0, @width, @height
#        @renderer.ctx.drawImage @buffer.canvas, 0, 0
#        @buffer.ctx.clearRect 0, 0, @width, @height

    drawRects: ->
        rectEntities = EntityManager.getAllEntitiesWithComponentOfTypes ["RenderableRect", "Position"]
        for entity in rectEntities
            rect = EntityManager.getComponentOfType entity, "RenderableRect"
            position = EntityManager.getComponentOfType entity, "Position"
            @buffer.ctx.fillStyle = rect.colour
            @buffer.ctx.fillRect position.x, position.y, rect.width, rect.height

    drawImages: ->
        imageEntities = EntityManager.getAllEntitiesWithComponentOfTypes ["RenderableImage", "Position"]
        for entity in imageEntities
            image = EntityManager.getComponentOfType entity, "RenderableImage"
            position = EntityManager.getComponentOfType entity, "Position"
            # TODO: Get the actual image?
            @buffer.ctx.drawImage image, position.x, position.y

    drawTexts: ->
        textEntities = EntityManager.getAllEntitiesWithComponentOfTypes ["RenderableText", "Position"]
        for entity in textEntities
            text = EntityManager.getComponentOfType entity, "RenderableText"
            position = EntityManager.getComponentOfType entity, "Position"
            @buffer.ctx.fillStyle = text.colour
            @buffer.ctx.font = text.font
            @buffer.ctx.fillText text.text, position.x, position.y

    ###
    init: ->
        @meter = new FPSMeter({ graph: 1})

    onUpdate: (dt) ->
        @meter.tickStart()

        if @entitySystem
            entities = @entitySystem.getAllEntitiesWithComponentOfTypes ["Renderable", "Position"]

            _.each entities, (entity) =>
                renderable = @entitySystem.getComponentOfType entity, "Renderable"
                position = @entitySystem.getComponentOfType entity, "Position"

                @bufferCtx.fillStyle = renderable.colour
                @bufferCtx.fillRect position.x, position.y, 20, 20

        @ctx.clearRect 0, 0, @WIDTH, @HEIGHT
        @ctx.drawImage @bufferCanvas, 0, 0
        @bufferCtx.clearRect 0, 0, @WIDTH, @HEIGHT

        @meter.tick()

    ###

module.exports = GraphicsSystem