import React, { useState } from 'react'

import { createRoot } from 'react-dom/client'

function ComponentA () {
  return <div>ComponentA</div>
}

function ComponentB () {
  return <div>ComponentB</div>
}

function App () {
  const [status, setStatus] = useState<boolean>(true)

  // 每次 App 重新执行，当 !status 时，count 与 setCount 可能为 undefined
  // App7.ts
  if (status) {
    var [count, setCount] = useState<number>(0)
  }

  const onClick = () => {
    setStatus(!status)
    setCount(count + 1)
  }

  return <div>
    <button onClick={onClick}>Button</button>
    <div>status: {status ? 1 : 0}</div>
    <div>count: {count}</div>
    <ComponentA></ComponentA>
    <ComponentB></ComponentB>
  </div>
}

const root1 = createRoot(document.querySelector('#root1'))

root1.render(<App></App>)
