import { useState } from 'react'
import Post from './components/post'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <h1>ook</h1>
      <Post/> 
    </div>
  )
}

export default App
