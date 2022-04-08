import React, { useState, useRef, useCallback, useEffect } from 'react'
import { flushSync } from 'react-dom'

interface Props {

}

export default function TestReact18<T extends Props> (props: T) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const containerRef = useRef(null)
  const countCopiedRef = useRef(null)

  useEffect(() => {
    console.log('useEffect count: ', count)
  }, [count])

  const addCountAsync = () => {
    for (let i = 1; i <= 3; i++) {
      setCount(count + 1)
    }
    // 无法实时获取到 count 最新值
    //  useEffect 中的回调执行了 1 次，说明默认是自动批处理
    console.log('addCountAsync count: ', count)
  }

  const addCountFlushSync = () => {
    // opt-out automatic batching
    for (let i = 1; i <= 3; i++) {
      flushSync(() => {
        setCount(count + 1)
        // 无法实时获取到 count 最新值
        // useEffect 中的回调执行了 3 次，说明没有批处理
        console.log('addCountFlushSync count: ', count)
      })
    }
  }

  const addCountInCallback = () => {
    setCount((count) => {
      count += 1
      return count
    })
    // 无法实时获取到 count 最新值
    console.log('setCount callback: ', count)
  }

  const getRefDOM = () => {
    console.log(countRef.current)
  }

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']

  const getColor = () => {
    // const randomColor = colors[Math.ceil(Math.random() * colors.length)]

    const randomIndex = Math.ceil(Math.random() * colors.length)
    const randomColor = colors[randomIndex]
    // colors[colors.length - 1] = colors.splice(randomIndex, 1, colors[colors.length - 1])[0]
    const last = colors[colors.length - 1]
    colors[colors.length - 1] = randomColor
    colors[randomIndex] = last

    return randomColor
  }

  const insertRefDOM = () => {
    const color = getColor()
    countCopiedRef.current.innerHTML += `<div style="color: ${color}">${countRef.current.cloneNode(true).innerHTML}</div>`
  }

  return <div ref={containerRef}>
    <button onClick={addCountAsync}>click async</button>
    <button onClick={addCountFlushSync}>click flushSync</button>
    <button onClick={addCountInCallback}>click callback</button>
    <button onClick={getRefDOM}>get countRef dom</button>
    <button onClick={insertRefDOM}>insert countRef DOM</button>
    <div ref={countRef}>count: {count}</div>
    <div ref={countCopiedRef}></div>
  </div>
}
