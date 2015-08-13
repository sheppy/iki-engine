Util = require "./Util.coffee"

class Map
    constructor: ->
        @width = 0
        @height = 0
        @tileWidth = 0
        @tileHeight = 0
        @layers = []
        @objects = []
        @tileSets = []


    loadMap: (mapFile) ->
        map = Util.loadJSON mapFile
        map.then @parseMap.bind @


    parseMap: (mapData) ->
        @width = mapData.width
        @height = mapData.height
        @tileWidth = mapData.tilewidth
        @tileHeight = mapData.tileheight

        @parseLayer layer for layer in mapData.layers
        @parseObjects layer for layer in mapData.layers
        @parseTileSet tileSet for tileSet in mapData.tilesets

        # Load the image assets
        loadPromises = []
        for tileSet in @tileSets
            promise = new Promise (resolve, reject) ->
                tileSet.img = new Image()
                # TODO: Note the path is hard coded and should probably be based on the location of the map
                tileSet.img.src = "assets/map/" + tileSet.src
                tileSet.img.onload = -> resolve()
                tileSet.img.onerror = -> reject()
            loadPromises.push promise

        return Promise.all loadPromises


    parseLayer: (layerData) ->
        # Currently only deal with tile layers
        if layerData.type != "tilelayer" then return

        layer =
            name: layerData.name
            data: []
            visible: layerData.visible
            properties: layerData.properties ? {}

        # Copy the tile number to the layer
        for y in [0..@height - 1]
            layer.data[y] = []
            for x in [0..@width - 1]
                layer.data[y][x] = layerData.data[(y * @width) + x]

        @layers.push layer


    parseObjects: (layerData) ->
        # Currently only deal with object group
        if layerData.type != "objectgroup" then return

        layer =
            name: layerData.name
            visible: layerData.visible
            objects: layerData.objects ? []

        @objects.push layer


    parseTileSet: (tileSetData) ->
        tileSet =
            imageWidth: tileSetData.imagewidth
            imageHeight: tileSetData.imageheight
            tileWidth: tileSetData.tilewidth
            tileHeight: tileSetData.tileheight
            firstGid: tileSetData.firstgid
            src: tileSetData.image

        tileSet.lastGid = tileSet.firstGid +
            ((tileSet.imageWidth * tileSet.imageHeight) / (tileSet.tileWidth * tileSet.tileHeight))

        tileSet.numXTiles = Math.floor tileSet.imageWidth / tileSet.tileWidth
        tileSet.numYTiles = Math.floor tileSet.imageHeight / tileSet.tileHeight

        @tileSets.push tileSet


    drawTile: (ctx, x, y, tw, th, tileNumber, tileSet, offsetX = 0, offsetY = 0) ->
        # Find the srcX & srcY in the image - reverse (x * y) + x = n
        srcX = Math.floor(tileNumber % tileSet.numXTiles) * tileSet.tileWidth
        srcY = Math.floor(tileNumber / tileSet.numXTiles) * tileSet.tileHeight

        ctx.drawImage tileSet.img,
            srcX, srcY,
            tileSet.tileWidth, tileSet.tileHeight,
            (x * tileSet.tileWidth) + offsetX, (y * tileSet.tileHeight) + offsetY,
            tileSet.tileWidth, tileSet.tileHeight


    drawTileFromNumber: (ctx, x, y, tw, th, tileNumber, offsetX = 0, offsetY = 0) ->
        # Find out what tile set we are in
        tileSet = @getTileSetOfTile tileNumber

        if tileSet
            tileNumber = tileNumber - tileSet.firstGid
            @drawTile ctx, x, y, @tileWidth, @tileHeight, tileNumber, tileSet, offsetX, offsetY


    getTileSetOfTile: (tileNumber) ->
        for set in @tileSets
            if (tileNumber >= set.firstGid) && (tileNumber <= set.lastGid)
                return set
        return false


    drawMap: (ctx) ->
        for layer in [0..@layers.length - 1]
            for y in [0..@height - 1]
                for x in [0..@width - 1]
                    @drawTileFromNumber ctx, x, y, @tileWidth, @tileHeight, @layers[layer].data[y][x]


    getRenderRect: (x, y, w, h) ->
        # Only draws a region of the map, from pixel x,y of pixel size w,h
        rect =
            left:   Math.floor x / @tileWidth
            right:  Math.ceil (x + w) / @tileWidth
            top:    Math.floor y / @tileHeight
            bottom: Math.ceil (y + h) / @tileHeight

        if rect.left < 0 then rect.left = 0
        if rect.top < 0 then rect.top = 0
        if rect.right >= @width then rect.right = @width - 1
        if rect.bottom >= @height then rect.bottom = @height - 1

        return rect

    drawMapRect: (ctx, x, y, w, h) ->
        rect = @getRenderRect x, y, w, h

        xOffset = 0 - x
        yOffset = 0 - y

        for layer in [0..@layers.length - 1]
            if @layers[layer].visible
                for y in [rect.top..rect.bottom]
                    for x in [rect.left..rect.right]
                        @drawTileFromNumber ctx, x, y, @tileWidth, @tileHeight, @layers[layer].data[y][x], xOffset, yOffset

    drawLayerRect: (ctx, x, y, w, h, layerIndex) ->
        rect = @getRenderRect x, y, w, h

        xOffset = 0 - x
        yOffset = 0 - y

        layer = @layers[layerIndex]
        for y in [rect.top..rect.bottom]
            for x in [rect.left..rect.right]
                @drawTileFromNumber ctx, x, y, @tileWidth, @tileHeight, @layers[layer].data[y][x], xOffset, yOffset

    getLayerIndexByName: (name) ->
        for layer in [0..@layers.length - 1]
            if @layers[layer].name == name
                return layer

    getLayerIndexWithProperty: (name, value) ->
        for layer in [0..@layers.length - 1]
            if @layers[layer].properties[name] && @layers[layer].properties[name] == value
                return layer

    getObjectsIndexByName: (name) ->
        for layer in [0..@objects.length - 1]
            if @objects[layer].name == name
                return layer

module.exports = Map