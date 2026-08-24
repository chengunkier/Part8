import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = () => {
  const userResult = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS)

  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = userResult.data.me.favoriteGenre
  const books = booksResult.data.allBooks.filter((book) =>
    book.genres.includes(favoriteGenre)
  )

  return (
    <div>
      <h2>recommendations</h2>

      <div>
        books in your favorite genre <b>{favoriteGenre}</b>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend