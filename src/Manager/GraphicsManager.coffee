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


module.exports = GraphicsManager