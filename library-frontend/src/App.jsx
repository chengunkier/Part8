import { useQuery } from '@apollo/client/react'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'

const App = () => {
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Authors authors={authorsResult.data.allAuthors} />
      <Books books={booksResult.data.allBooks} />
    </div>
  )
}

export default App