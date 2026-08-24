const { GraphQLError } = require('graphql')
const Book = require('./models/book')
const Author = require('./models/author')

const resolvers = {
  Query: {
    bookCount: async () => {
      return Book.countDocuments({})
    },

    authorCount: async () => {
      return Author.countDocuments({})
    },

    allBooks: async (root, args) => {
      let books

      if (args.author) {
        const author = await Author.findOne({ name: args.author })

        if (!author) {
          return []
        }

        books = await Book.find({ author: author._id }).populate('author')
      } else {
        books = await Book.find({}).populate('author')
      }

      if (args.genre) {
        books = books.filter((book) =>
          book.genres.includes(args.genre)
        )
      }

      return books
    },

    allAuthors: async () => {
      return Author.find({})
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({
        name: args.author
      })

      if (!author) {
        author = new Author({
          name: args.author
        })

        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError(
            `Creating author failed: ${error.message}`,
            {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error
              }
            }
          )
        }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres
      })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError(
          `Creating book failed: ${error.message}`,
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          }
        )
      }

      return book
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({
        name: args.name
      })

      if (!author) {
        return null
      }

      author.born = args.setBornTo

      try {
        return await author.save()
      } catch (error) {
        throw new GraphQLError(
          `Updating author failed: ${error.message}`,
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          }
        )
      }
    }
  }
}

module.exports = resolvers