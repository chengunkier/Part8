import { useState } from 'react'
import Authors from './components/Authors'
import Book from './components/Book'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} />
      <Book show={page === 'books'} />
      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App