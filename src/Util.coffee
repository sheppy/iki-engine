class Util
    @loadJSON: (url) -> Util.load(url).then(JSON.parse)

    @load: (url) ->
        promise = new Promise (resolve, reject) ->
            xhr = new XMLHttpRequest()
            #xhr.responseType = "application/json"
            xhr.open "GET", url, true
            xhr.addEventListener "readystatechange", ->
                if xhr.readyState is 4
                    if xhr.status in [200, 304]
                        resolve xhr.responseText
                    else
                        reject "error"
            xhr.send()
        return promise


    @loadImage: (src) ->
        promise = new Promise (resolve, reject) ->
            image = new Image()
            image.addEventListener "load", -> resolve @
            image.addEventListener "error", -> reject "error"
            image.src = src
            if image.complete then resolve image
        return promise


    @pluralise: (word) ->
        len = word.length

        l1 = word.substr -1
        l2 = word.substr -2

        if l1 == "y"
            word = word.substr(0, len - 1) + "ies"
        else if l1 == "s" || l1 == "x" || l2 == "ch" || l2 == "sh" || l2 == "es"
            # If word ends in "s" "x" or "ch" or "sh" add "es"
            word = word + "es"
        else
            word = word + "s"

        return word


    @isPointInRect: (x, y, rx, ry, rw, rh) ->
        return x >= rx && x <= rx + rw && y >= ry && y <= ry + rh

module.exports = Util