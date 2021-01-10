import { ApolloServer } from 'apollo-server'
import { gql } from 'apollo-server'

const resolvers = {
  Query: {
    testMessage: (): string => 'Hello World!',
  },
}

const typeDefs = gql`
  type Query {
    """
    Test Message.
    """
    testMessage: String!
  }
`

const server = new ApolloServer({ resolvers, typeDefs })

server.listen().then(({ url }) => console.log(`Server ready at ${url}. `))

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => console.log('Module disposed. '))
}
