import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = (props) => {
  const userResult = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  if (userResult.error || booksResult.error) {
    return (
      <div>
        error: {userResult.error?.message || booksResult.error?.message}
      </div>
    )
  }

  const favoriteGenre = userResult.data.me?.favoriteGenre
  const books = booksResult.data.allBooks
  const recommendedBooks = favoriteGenre
    ? books.filter((b) => b.genres.includes(favoriteGenre))
    : books

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
          {recommendedBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations