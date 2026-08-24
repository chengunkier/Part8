import { useQuery } from '@apollo/client/react'
import { ALL_AUTHORS } from './queries'
import Authors from './components/Authors'

const App = () => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Authors authors={result.data.allAuthors} />
    </div>
  )
}

export default App