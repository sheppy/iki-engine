IkiEngine = {}

IkiEngine.Engine = require "./Engine"
IkiEngine.Entity = require "./Entity"
IkiEngine.Map = require "./Map"
IkiEngine.Scene = require "./Scene"
IkiEngine.System = require "./System"
IkiEngine.Util = require "./Util"

IkiEngine.AssetManager = require "./Manager/AssetManager"
IkiEngine.AudioManager = require "./Manager/AudioManager"
IkiEngine.EntityManager = require "./Manager/EntityManager"
IkiEngine.GraphicsManager = require "./Manager/GraphicsManager"
IkiEngine.InputManager = require "./Manager/InputManager"
IkiEngine.SceneManager = require "./Manager/SceneManager"

IkiEngine.FloatingTextSystem = require "./System/FloatingTextSystem"
IkiEngine.GraphicsSystem = require "./System/GraphicsSystem"
IkiEngine.InputSystem = require "./System/InputSystem"
IkiEngine.UserInterfaceSystem = require "./System/UserInterfaceSystem"


module.exports = IkiEngine
