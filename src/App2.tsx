import React, { useState } from 'react'

import { createRoot, Root } from 'react-dom/client'

function App () {
  const [count, setCount] = useState<number>(0)

  // React 深度优先遍历
  // p 标签没有 child 了，然后找 p 的 sibling 即 button
  // beginWork 和 completeWork 皆是如此

  // RootFiber(beginWork) -> App(beginWork) -> p(beginWork) -> p(completeWork) 
  // -> p.sibling - button(beginWork) -> button(completeWork)
  // -> button-return - App(completeWork) -> RootFiber(completeWork)
  return <>
    <p>123</p>
    <button onClick={() => {
      debugger
      setCount(count + 1)
    }}>{count}</button>
  </>
}

const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App />)

console.log(root1)
