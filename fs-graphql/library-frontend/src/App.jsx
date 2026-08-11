import { useState } from 'react'
import Authors from './components/Authors'
import Book from './components/Book'

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
      </div>

      <Authors show={page === 'authors'} />
      <Book show={page === 'books'} />
    </div>
  )
}

export default App