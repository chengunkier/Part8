const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')
const resolvers = require('./resolvers')
const typeDefs = require('./schema')
const User = require('./models/user')

const startServer = (port) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  startStandaloneServer(server, {
    listen: { port },
    context: async ({ req }) => {
      const auth = req.headers.authorization
      if (auth && auth.startsWith('Bearer ')) {
        try {
          const decodedToken = jwt.verify(
            auth.substring(7), 
            process.env.JWT_SECRET
          )
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        } catch (error) {
        }
      }
      return { currentUser: null }
    },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
}

module.exports = startServer