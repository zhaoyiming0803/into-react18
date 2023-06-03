import React, { useState } from 'react'

import { createRoot, Root } from 'react-dom/client'

function CustomComponent () {
  // mount

  // mountState(initialState):
  // mountWorkInProgressHook()
  // var dispatch = queue.dispatch = dispatchSetState.bind(null, currentlyRenderingFiber$1, queue);
  // return [hook.memoizedState, dispatch];

  // ---------------------------------

  // update

  // updateState
  // updateReducer
  // updateWorkInProgressHook

  debugger
  const [count, setCount] = useState<number>(0)
  debugger
  const [random, setRandom] = useState<number>(0)

  const onClick = () => {
    debugger
    setCount(count + 1)
    debugger
    setRandom(Math.random())
  }

  return <button onClick={onClick}>{count} - {random}</button>
}

function App () {
  return <CustomComponent></CustomComponent>
}

const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App />)

console.log(root1)
