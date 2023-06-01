import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'

import { createRoot, Root } from 'react-dom/client'

function App () {
  const [count, setCount] = useState<number>(0)

  // useLayoutEffect 总是在 DOMContentLoaded 前执行，useEffect 不一定

  // commitLayoutEffects（同步先执行） 和 flushPassiveEffects（异步后执行） 都在 commitRoot 中

  // commitHookEffectListMount 最核心的作用就是执行 useEffect 或 useLayoutEffect 的第一个参数（函数）

  // debugger
  useEffect(() => {
    debugger
    console.log('useEffect: ', count, document.querySelector('#count-box').innerHTML)

    return () => {
      console.log('component destroy in useEffect')
    }
  }, [count])

  // debugger
  useLayoutEffect(() => {
    debugger
    console.log('useLayoutEffect: ', count, document.querySelector('#count-box').innerHTML)
  }, [count])
  
  return <>
    <div id="count-box">{count}</div>
    <button onClick={() => setCount(count + 1)}>Button</button>
  </>
}

const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App />)

console.log(root1)
