import { createServer } from 'http'

import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import expressPino from 'express-pino-logger'

import { appConfig } from './app'
import getEnv from './env'
import { logger, LoggerLevel } from './logger'
import { errorHandler } from './context/error/errorHandler'
import { ErrorType } from './context/error/Error'

const {
  app: { port },
} = getEnv()

const PORT = port || 4000
const expressLogger = expressPino({ logger, level: LoggerLevel.ERROR })

const app = express()
const ws = createServer(app)

/**
 * Middlewares
 */
app.use(bodyParser.json())
app.use(expressLogger)
app.use((err: undefined, req: unknown, res: unknown, next: () => void) => {
  if (err) {
    errorHandler.handleError({
      type: ErrorType.EXPRESS_MIDDLEWARE,
      source: err,
    })
  }
  next()
})

/**
 * Apollo
 */
const server = new ApolloServer(appConfig)
server.applyMiddleware({ app })
server.installSubscriptionHandlers(ws)

ws.listen({ port: PORT }, () => {
  logger.info(`GraphQL API URL: http://localhost:${PORT}${server.graphqlPath}`)
  logger.info(`Subscriptions URL: ws://localhost:${PORT}${server.graphqlPath}`)
})
