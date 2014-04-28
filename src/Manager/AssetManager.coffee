Util = require "../Util.coffee"

class AssetManager
    @assets = {}
    @numAssets = 0
    @assetsLoaded = 0

    @load: (manifest) ->
        @numAssets = 0
        @assetsLoaded = 0

        promise = new Promise (resolve) ->
            loadManifest = Util.loadJSON manifest
            loadManifest.then (json) ->
                for i, assetGroup of json.assets
                    for a in assetGroup
                        AssetManager.numAssets++

                for groupName, assetGroup of json.assets
                    for asset in assetGroup
                        AssetManager.onBeforeLoad? asset,
                            groupName,
                            AssetManager.assetsLoaded,
                            AssetManager.numAssets

                        do (asset) ->
                            # Load based on file type
                            if asset.type == "image"
                                assetLoad = Util.loadImage json.root + asset.file
                                assetLoad.then (img) -> AssetManager.assetLoaded asset, groupName, resolve, img
                            else if asset.type == "json"
                                assetLoad = Util.loadJSON json.root + asset.file
                                assetLoad.then (json) -> AssetManager.assetLoaded asset, groupName, resolve, json
                            else
                                assetLoad = Util.load json.root + asset.file
                                assetLoad.then -> AssetManager.assetLoaded asset, groupName, resolve
 #
                            assetLoad.catch -> AssetManager.onError asset, groupName

        return promise

    @assetLoaded: (asset, groupName, resolve, data) ->
        if data then AssetManager.assets[asset.file] = data
        AssetManager.assetsLoaded++
        AssetManager.onProgress? asset,
            groupName,
            AssetManager.assetsLoaded,
            AssetManager.numAssets

        if AssetManager.assetsLoaded is AssetManager.numAssets
            AssetManager.onLoaded?()
            resolve()

    @onBeforeLoad: (asset, group, loaded, total) -> # User level hook
    @onProgress: (asset, group, loaded, total) -> # User level hook
    @onError: (asset, group) -> # User level hook
    @onLoaded: -> # User level hook

    @get: (asset) -> AssetManager.assets[asset]


module.exports = AssetManager