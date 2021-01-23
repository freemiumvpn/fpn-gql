import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import expressPino from 'express-pino-logger'

import { appConfig } from './app'
import getEnv from './env'
import { logger, LoggerLevel } from './logger'

const {
  app: { port },
} = getEnv()

const PORT = port || 4000
const expressLogger = expressPino({ logger, level: LoggerLevel.ERROR })

const app = express()

app.use(bodyParser.json())
app.use(expressLogger)

const server = new ApolloServer(appConfig)
server.applyMiddleware({ app })

app.listen({ port: PORT }, () => {
  logger.info(`Server ready at http://localhost:${PORT}${server.graphqlPath}. `)
})
