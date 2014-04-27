uuid = require "../../vendor/node-uuid/uuid.js"
Entity = require "../Entity.coffee"

class EntityManager
    @entities = []

    @createEntity: (id, addToList = true) ->
        id ?= uuid.v1()
        entity = new Entity
        entity.id = id
        @addEntity entity if addToList
        return entity

    @addEntity: (entity) -> @entities.push entity

    @removeEntity: (entity) ->
        # Find the index of the entity in the list
        index = -1
        for e, i in @entities
            if e == entity then index = i

        # Remove from entity list
        @entities.splice(index, 1)

        return entity

    @deleteEntity: (entity) ->
        entity.removeAllComponents()
        @removeEntity entity

    @getEntityById: ->
    @getAllEntitiesWithComponentOfType: ->

    @getAllEntitiesWithComponentOfTypes: (componentTypes) ->
        entities = []
        for entity in @entities
            componentCount = 0
            for component in entity.components
                if componentTypes.indexOf(component.type) > -1 then componentCount++
            if componentCount == componentTypes.length then entities.push entity
        return entities

    @addComponent: (entity, component) -> entity.components.push component

    @hasComponent: ->

    @getComponentOfType: (entity, componentType) ->
        for component in entity.components
            if component.type == componentType then return component
        return null

    @removeAllComponents: (entity) -> entity.components.length = 0


#    getComponentOfType: (entity, componentType) -> _.find entity.components, (c) -> c.type == componentType


module.exports = EntityManager