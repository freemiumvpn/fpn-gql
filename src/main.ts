import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'

import appConfig from './app'
import getEnv from './env'

const {
  app: { port },
} = getEnv()

const PORT = port || 4000

const app = express()
app.use(bodyParser.json())

const server = new ApolloServer(appConfig)
server.applyMiddleware({ app })

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}. `)
})
