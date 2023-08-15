import React, { useEffect, useLayoutEffect, useState } from 'react'

import { createRoot, Root } from 'react-dom/client'

function App () {
  const [count, setCount] = useState<number>(0)

  const onClickCount = () => {
    debugger
    setCount(count + 1)

    // 这里的 count 依旧是 0，而 innerHTML 却是 1 的原因：
    // count 相当于局部变量
    // innerHTML 相当于全局变量
    // https://github.com/zhaoyiming0803/test-code/blob/master/test354.js
    setTimeout(() => {
      debugger
      console.log('count in setTimeout: ', count, document.querySelector('#box').innerHTML) // 0 1
    }, 1000)

    // 内存中的 count 和 dom 中的 count 都不会实时更新，不是最新值
    debugger
    console.log('count in onClickCount: ', count, document.querySelector('#box').innerHTML) // 0 0
  }

  // commitLayoutEffects -> requestPaint -> ensureRootIsScheduled-> flushPassiveEffects
  useEffect(() => {
    debugger
    console.log('count in useEffect: ', count)
  }, [count])

  useLayoutEffect(() => {
    debugger
    console.log('count in useLayoutEffect: ', count)
  }, [count])

  debugger
  return <button onClick={onClickCount} id="box">{count}</button>
}

const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App />)

console.log(root1)
