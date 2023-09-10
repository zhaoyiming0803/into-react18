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

let count = 0

function App2 () {
  useEffect(() => {
    let timer = setInterval(() => {
      // count 虽然会递增，但不是使用 hook 触发的，所以视图不会更新
      // 与 App18.tsx 中的 useRef 是一个效果
      console.log('count: ', count)
      count += 1
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

function App4 () {
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

function App5 () {
  const [count, setCount] = useState<number>(0)
  const [list, setList] = useState<string[]>([])

  useEffect(() => {
    let timer = setInterval(() => {
      setCount((count) => {
        return (count + 1) % 4
      })
    }, 800)

    return () => {
      clearInterval(timer)
      timer = null
    }
  }, [])

  useEffect(() => {
    setList(new Array(count).fill(''))
  }, [count])

  return <>
    {list.map((item, index) => <span 
      key={index} 
      style={{
        display: 'inline-block',
        width: '2px',
        height: '2px',
        marginRight: '2px',
        border: '1px solid #f00',
        borderRadius: '50%'
      }}>
      </span>)}
  </>
}

const root = createRoot(document.querySelector('#root1'))

root.render(<App5 />)