Util = require "./Util.coffee"

class Map
    constructor: ->
        @width = 0
        @height = 0
        @tileWidth = 0
        @tileHeight = 0
        @layers = []
        @tileMaps = []

    loadMap: (mapFile) ->
        console.log "Map > loadMap", mapFile
        map = Util.loadJSON mapFile
        map.then @parseMap.bind @

    parseMap: (mapData) ->
        console.log "Map > parseMap", mapData
        @width = mapData.width
        @height = mapData.height
        @tileWidth = mapData.tileWidth
        @tileHeight = mapData.tileHeight

        @parseLayer layer for layer in mapData.layers
        @parseTileSet tileSet for tileSet in mapData.tilesets

        console.log @tileMaps, @layers

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
                layer.data[y][x] = layer.data[(y * @width) + x]

    parseTileSet: (tileSetData) ->

module.exports = Map