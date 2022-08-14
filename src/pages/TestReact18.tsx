/**
 * 当前文件只用于测试 React 18 相关特性
 */
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { flushSync } from 'react-dom'

import { test1 } from '../utils/test'

console.log(test1())

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
    for (var i = 1; i <= 3; i++) {
      setCount(count + i)
      // 无法实时获取到 count 最新值
      // console.log('TestReact18 render') 执行了 1 次，说明 React 18 在非受控场景下也是自动批处理
      // console.log('useEffect count: ', count) 只打印一次最终的结果值 3，与 Vue 的 watch 类似
      console.log('addCountAsync count: ', count)
    }
  }

  const addCountFlushSync = () => {
    // opt-out automatic batching
    for (let i = 1; i <= 3; i++) {
      flushSync(() => {
        setCount(count + i)
        // console.log('TestReact18 render') 执行了 3 次，说明 React 18 在 flushSync 不会自动批处理
        // 相同的，useEffect count: 也打印了 3 次，值分别是从当前值递增的 0 1 2 等

        // 无法实时获取到 count 最新值，依旧打印 3 次 0
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

  const requestStr = (): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() + '')
      }, 1000)
    })
  }

  const [str, setStr] = useState<string>('')

  const useData = () => {
    const initStr = useCallback(async () => {
      const _str = await requestStr()
      setStr(_str)
    }, [])

    useEffect(() => {
      initStr()
    }, [])

    return useMemo(() => {
      return {
        a: 1,
        b: 2,
        str
      }
    }, [str])
  }

  return <div ref={containerRef}>
    <button onClick={addCountAsync}>click async</button>
    <button onClick={addCountFlushSync}>click flushSync</button>
    <button onClick={addCountInCallback}>click callback</button>
    <button onClick={addCountInSetTimeout}>click in setTimeout</button>
    <button onClick={getRefDOM}>get countRef dom</button>
    <button onClick={insertRefDOM}>insert countRef DOM</button>
    <div ref={countRef}>count: {count}</div>
    <div ref={countCopiedRef}></div>
    <div>{useData().a + useData().b + useData().str}</div>
  </div>
}
