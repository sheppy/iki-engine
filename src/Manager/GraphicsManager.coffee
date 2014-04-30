class GraphicsManager

    @createCanvas: (width, height, appendTo) ->
        canvas = document.createElement "canvas"
        canvas.width = width
        canvas.height = height

        if appendTo then appendTo.appendChild canvas

        return canvas


    @createRenderer: (width, height, appendTo) ->
        renderer = {}
        renderer.canvas = GraphicsManager.createCanvas width, height, appendTo
        renderer.ctx = renderer.canvas.getContext "2d"
        renderer.width = width
        renderer.height = height
        return renderer


    @fillImage: (ctx, image, imageWidth, imageHeight, destinationWidth, destinationHeight) ->
        ratioImage = imageWidth / imageHeight
        ratioDestination = destinationWidth / destinationHeight

        width = destinationWidth
        height = destinationHeight

        if ratioDestination > ratioImage
            height = destinationWidth / ratioImage
        else
            width = destinationHeight * ratioImage

        ctx.drawImage image, 0, 0, imageWidth, imageHeight, 0, 0, width, height


    @fitImage: (ctx, image, imageWidth, imageHeight, destinationWidth, destinationHeight) ->
        ratioImage = imageWidth / imageHeight
        ratioDestination = destinationWidth / destinationHeight

        width = destinationWidth
        height = destinationHeight

        if ratioDestination > ratioImage
            width = imageWidth * destinationHeight / imageHeight
            height = destinationHeight
        else
            width = destinationWidth
            height = imageHeight * destinationWidth / imageWidth

        ctx.drawImage image, 0, 0, imageWidth, imageHeight, 0, 0, width, height


    @roundedRectStroke: (ctx, x, y, w, h, radius) ->
        r = x + w
        b = y + h
        ctx.beginPath()
        ctx.moveTo x + radius, y
        ctx.lineTo r - radius, y
        ctx.quadraticCurveTo r, y, r, y + radius
        ctx.lineTo r, y + h - radius
        ctx.quadraticCurveTo r, b, r - radius, b
        ctx.lineTo x + radius, b
        ctx.quadraticCurveTo x, b, x, b - radius
        ctx.lineTo x, y + radius
        ctx.quadraticCurveTo x, y, x + radius, y
        ctx.stroke()

    @roundedRectFill: (ctx, x, y, w, h, radius) ->
        r = x + w
        b = y + h
        ctx.beginPath()
        ctx.moveTo x + radius, y
        ctx.lineTo r - radius, y
        ctx.quadraticCurveTo r, y, r, y + radius
        ctx.lineTo r, y + h - radius
        ctx.quadraticCurveTo r, b, r - radius, b
        ctx.lineTo x + radius, b
        ctx.quadraticCurveTo x, b, x, b - radius
        ctx.lineTo x, y + radius
        ctx.quadraticCurveTo x, y, x + radius, y
        ctx.fill()

module.exports = GraphicsManager