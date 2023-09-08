import React, { useEffect, useRef } from 'react'

import { createRoot } from 'react-dom/client'

function App () {
  const countRef = useRef(0)

  const divRef = useRef(null)

  const onClick = () => {
    // useRef 适合在内存中存储数据状态，它不会触发 re-render
    // 将变量写在组件外边是一样的效果
    // 只是 useRef 可以用来绑定 dom
    debugger
    countRef.current += 1
    console.log('countRef.current in onClick: ', countRef.current)
    console.log('divRef.current in onClick: ', divRef.current)
  }

  useEffect(() => {
    // 只会在组件初始化时执行一次
    // 点击事件后不会再触发，即使监听了 countRef.current
    // 因为没有走到 commitRoot 中
    console.log('countRef.current in useEffect: ', countRef.current)
  }, [countRef.current])

  return <>
    <div ref={divRef}>countRef.current: {countRef.current}</div>
    <button onClick={onClick}>Button</button>
  </>
}

const root = createRoot(document.querySelector('#root1'))

root.render(<App></App>)