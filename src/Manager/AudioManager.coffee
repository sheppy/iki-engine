class AudioManager
    @sounds: {}

    @load: (id, audioFile) ->
        sound = document.createElement "audio"
        sound.src = audioFile
        AudioManager.sounds[id] = sound

    @play: (id) ->
        sound = AudioManager.sounds[id]
        if sound
            sound.pause()
            sound.currentTime = 0
            sound.play()

module.exports = AudioManager