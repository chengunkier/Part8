const Book = require('./models/book')
const Author = require('./models/author')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async () => {
      // author/genre filters are not required to work yet
      return Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    // bookCount does not have to work yet
    bookCount: () => 0,
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }

      const book = new Book({ ...args, author: author._id })
      await book.save()

      return book.populate('author')
    },
    editAuthor: async (root, args) => {
      // does not have to work yet
      return null
    },
  },
}

module.exports = resolvers