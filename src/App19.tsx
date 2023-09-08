import React, { useEffect, useState } from 'react'

import { createRoot } from 'react-dom/client'

function App1 () {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let timer = setInterval(() => {
      debugger
      // React 中的闭包陷阱，这种写法 count 永远是初始值 0
      // https://github.com/zhaoyiming0803/test-code/blob/master/test354.js
      // 参考 App10.tsx
      console.log('count: ', count)
      setCount(count + 1)
    }, 3000)
    return () => {
      clearInterval(timer)
      timer = null
    }
  }, [])

  return <>
    <div>count: {count}</div>
  </>
}

function App2 () {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let timer = setInterval(() => {
      debugger
      // 打印的 count 依然永远是 0
      console.log('count: ', count)
      setCount((count) => {
        debugger
        // 执行到这个地方的时候，count 的取值来源于 update.eagerState，而不是上面闭包中的 state
        // 所以是最新值
        return count + 1
      })
    }, 3000)
    return () => {
      clearInterval(timer)
      timer = null
    }
  }, [])

  return <>
    <div>count: {count}</div>
  </>
}

function App3 () {
  const [count, setCount] = useState(0)

  const onClick = () => {
    setCount(count + 1)
  }

  useEffect(() => {
    debugger
    console.log('count: ', count)
  }, [count])

  return <>
    <div>count: {count}</div>
    <button onClick={onClick}>Button</button>
  </>
}

const root = createRoot(document.querySelector('#root1'))

root.render(<App1 />)