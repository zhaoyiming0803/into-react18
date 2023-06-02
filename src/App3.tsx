import React, { useState } from 'react'

import { createRoot, Root } from 'react-dom/client'

function App () {
  const [status, setStatus] = useState<boolean>(true)

  // 单节点对比

  // key 相同，type 相同
  // 使用 useFiber 直接复用节点
  // const a = <p>a</p>
  // const b = <p>b</p>

  // key 相同，type 不同
  // deleteRemainingChildren(returnFiber, child);
  // const a = <p>a</p>
  // const b = <span>b</span>

  // key 不同，type 不同
  // deleteChild(returnFiber, child);
  const a = <p key="a">a</p>
  const b = <p key="b">b</p>

  return <div onClick={() => setStatus(!status)}>
    {status ? a : b}
  </div>
}

const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App />)

console.log(root1)
