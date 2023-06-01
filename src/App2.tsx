import React, { useState } from 'react'

import { createRoot, Root } from 'react-dom/client'

function App () {
  const [count, setCount] = useState<number>(0)
  
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}

const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App />)

console.log(root1)
