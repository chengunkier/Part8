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

        await author.save()
      }

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