Util = require "./Util.coffee"

class Map
    constructor: ->
        @width = 0
        @height = 0
        @tileWidth = 0
        @tileHeight = 0
        @layers = []
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
        @parseTileSet tileSet for tileSet in mapData.tilesets

        # Load the image assets
        loadPromises = []
        for tileSet in @tileSets
            promise = new Promise (resolve, reject) ->
                tileSet.img = new Image()
                # Note the path is hard coded and should probably be based on the location of the map
                tileSet.img.src = "/assets/map/" + tileSet.src
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

        # Copy the tile number to the layer
        for y in [0..@height - 1]
            layer.data[y] = []
            for x in [0..@width - 1]
                layer.data[y][x] = layerData.data[(y * @width) + x]

        @layers.push layer


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


    drawMapRect: (ctx, x, y, w, h) ->
        # Only draws a region of the map, from pixel x,y of pixel size w,h
        leftTile = Math.floor x / @tileWidth
        rightTile = Math.ceil (x + w) / @tileWidth
        topTile = Math.floor y / @tileHeight
        bottomTile = Math.ceil (y + h) / @tileHeight

        if leftTile < 0 then leftTile = 0
        if topTile < 0 then topTile = 0
        if rightTile >= @width then rightTile = @width - 1
        if bottomTile >= @height then bottomTile = @height - 1

        xOffset = 0 - x
        yOffset = 0 - y

        for layer in [0..@layers.length - 1]
            for y in [topTile..bottomTile]
                for x in [leftTile..rightTile]
                    @drawTileFromNumber ctx, x, y, @tileWidth, @tileHeight, @layers[layer].data[y][x], xOffset, yOffset


module.exports = Map