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

    allBooks: async () => {
      return Book.find({}).populate('author')
    },

    allAuthors: async () => {
      return Author.find({})
    }
  },

  Author: {
    bookCount: async () => {
      return 0
    }
  },

  Book: {
    author: async (root) => {
      return Author.findById(root.author)
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({
        name: args.author
      })

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres
      })

      return book.save()
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({
        name: args.name
      })

      if (!author) {
        return null
      }

      author.born = args.setBornTo

      return author.save()
    }
  }
}

module.exports = resolvers