import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'

const Book = (props) => {
  const [genre, setGenre] = useState(null)

  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
    fetchPolicy: 'network-only',
  })

  const allBooksResult = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading || allBooksResult.loading) {
    return <div>loading...</div>
  }

  if (result.error) {
    return <div>error: {result.error.message}</div>
  }

  const books = result.data.allBooks

  const genres = allBooksResult.data
    ? [...new Set(allBooksResult.data.allBooks.flatMap((b) => b.genres))]
    : []

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <div>
          in genre <b>{genre}</b>
        </div>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Book