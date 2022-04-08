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
      setCount(count + i)
      // 无法实时获取到 count 最新值
      // console.log('TestReact18 render') 执行了 1 次，说明 React 18 在非受控场景下也是自动批处理
      console.log('addCountAsync count: ', count)
    }
  }

  const addCountFlushSync = () => {
    // opt-out automatic batching
    for (let i = 1; i <= 3; i++) {
      flushSync(() => {
        setCount(count + i)
        // 无法实时获取到 count 最新值
        // console.log('TestReact18 render') 执行了 3 次，说明 React 18 在非受控场景下也是自动批处理
        // 相同的，useEffect count: 也打印了 3 次
        console.log('addCountFlushSync count: ', count)
      })
    }
  }

  const addCountInSetTimeout = () => {
    // opt-out automatic batching
    setTimeout(() => {
      for (let i = 1; i <= 3; i++) {
        setCount(count + i)
        // 无法实时获取到 count 最新值
        // console.log('TestReact18 render') 执行了 1 次，说明 React 18 在非受控场景下也是自动批处理
        console.log('addCountInSetTimeout count: ', count)
      }
    })
  }

  const addCountInCallback = () => {
    for (let i = 1; i <= 3; i++) {
      setCount((count: number) => {
        count += i
        return count
      })
      // 无法实时获取到 count 最新值
      // // console.log('TestReact18 render') 执行了 1 次，说明 React 18 在 hooks 回调中也是自动批处理
      console.log('setCount callback: ', count)
    }
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

  console.log('TestReact18 render')

  return <div ref={containerRef}>
    <button onClick={addCountAsync}>click async</button>
    <button onClick={addCountFlushSync}>click flushSync</button>
    <button onClick={addCountInCallback}>click callback</button>
    <button onClick={addCountInSetTimeout}>click in setTimeout</button>
    <button onClick={getRefDOM}>get countRef dom</button>
    <button onClick={insertRefDOM}>insert countRef DOM</button>
    <div ref={countRef}>count: {count}</div>
    <div ref={countCopiedRef}></div>
  </div>
}
