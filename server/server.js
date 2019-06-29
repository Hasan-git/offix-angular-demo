const express = require('express')
const queries = require('./queries')
const { VoyagerServer, gql } = require('@aerogear/voyager-server')
const metrics = require('@aerogear/voyager-metrics')
const auditLogger = require('@aerogear/voyager-audit')
const { conflictHandler } = require('@aerogear/voyager-conflicts')
const { GenerateObjectId } = require('./utils')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const TOPIC = 'TOPIC'

// Types
const typeDefs = gql`

  type Greeting {
    id : String
    msg: String
    ## Can be used to track conflicts
    version: Int
  }

  type Subscription {
    greetings: Greeting
  }

  type Query {

    greeting(id: String!): Greeting
    greetings: [Greeting]
  }

  type Mutation {

    addGreeting(id: String!, msg: String!): Greeting
    deleteGreeting(id: String!): Greeting
    ## Server resolution policy
    changeGreeting(msg: String!, version: Int!): Greeting
    ## Client resolution policy
    changeGreetingClient(msg: String!, version: Int!): Greeting
  }
`
// In Memory Data Source
let greeting = {
  id: "5d17a6d25a009f3412488222",
  msg: 'greeting from Voyager Server',
  version: 1
}

let greetings = [
  {
    id: "5d17a6d25a009f3412488207",
    msg: 'Greeting from Voyager Server',
    version: 1
  },
  {
    id: "5d17a6d25a009f3412488421",
    msg: 'Greeting from Offix',
    version: 1
  }
]

// Custom conflict resolution strategy that concatenates the msg properties together
const customGreetingResolutionStrategy = function (serverData, clientData, baseData) {
  return {
    msg: serverData.msg + ' ' + clientData.msg
  }
}

// Resolver functions. This is our business logic
const resolvers = {
  Mutation: {
    changeGreeting: async (obj, args, context, info) => {

      if (conflictHandler.hasConflict(greeting, args, obj, args, context, info)) {
        const serverState = greeting
        const clientState = args
        const strategy = customGreetingResolutionStrategy

        // resolvedState is the new record the user should persist
        // response is the specially built message that should be returned to the client
        const { resolvedState, response } = await conflictHandler.resolveOnServer(strategy, serverState, clientState)
        greeting = resolvedState
        return response
      }
      // pubsub.publish(TOPIC, { hello: message })
      greeting = conflictHandler.nextState(args)
      return greeting
    },
    changeGreetingClient: async (obj, args, context, info) => {
      if (conflictHandler.hasConflict(greeting, args, obj, args, context, info)) {
        const serverState = greeting
        const clientState = args
        return conflictHandler.resolveOnClient(serverState, clientState).response
      }
      greeting = conflictHandler.nextState(args)
      return greeting
    },
    addGreeting: async (obj, { msg, id }, context, info) => {
      console.log(msg, id)
      let greeting = {
        // id: greetings.length ? Math.max.apply(Math, greetings.map(function (o) { return o.id; })) + 1 : 1,
        id: id ? id : GenerateObjectId(),
        msg: msg,
        version: 1
      }

      greetings.push(greeting)

      return greeting
    },
    deleteGreeting: async (obj, { id }, context, info) => {

      let index = greetings.findIndex(obj => obj.id === id)

      if (index > -1) {
        let greeting = greetings[index]
        greetings.splice(index, 1)
        return greeting
      }
      else
        return null
    }
  },
  Query: {
    greeting: (obj, { id }, context, info) => {

      return greetings.find(obj => obj.id == id)
    },
    greetings: (obj, args, context, info) => {

      // pubsub.publish(TOPIC, { greetings: greetings[0] })

      return greetings
    },

  },
  Subscription: {
    greetings: {
      subscribe: () => {
        return pubsub.asyncIterator(TOPIC)
      }
    }
  }
}

// The context is a function or object that can add some extra data
// That will be available via the `context` argument the resolver functions
const context = ({ req }) => {
  return {
    serverName: 'Voyager Server'
  }
}

// Initialize the voyager server with our schema and context
const apolloConfig = {
  typeDefs,
  resolvers,
  playground: {
    tabs: [{
      endpoint: '/graphql',
      variables: {},
      query: queries
    }]
  },
  context
}

const voyagerConfig = {
  metrics,
  auditLogger
}

const server = VoyagerServer(apolloConfig, voyagerConfig)

const app = express()

metrics.applyMetricsMiddlewares(app)

server.applyMiddleware({ app })

module.exports = { app, server, schema: server.schema }
