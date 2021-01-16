import { ApolloServer } from 'apollo-server'

import { resolvers, typeDefs } from './app'

const server = new ApolloServer({ resolvers, typeDefs })

server.listen().then(({ url }) => console.log(`Server ready at ${url}. `))
