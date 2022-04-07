import React, { useState } from 'react'
import { flushSync } from 'react-dom'

interface Props {

}

export default function TestReact18<T extends Props> (props: T) {
  const [count, setCount] = useState(0)

  const addCountAsync = () => {
    setCount(count + 1)
    // 无法实时获取到 count 最新值
    console.log('async count: ', count)
  }

  const addCountFlushSync = () => {
    // opt-out automatic batching
    flushSync(() => {
      setCount(count + 1)
      // 无法实时获取到 count 最新值
      console.log('sync count: ', count)
    })
  }

  const addCountInCallback = () => {
    setCount((count) => {
      count += 1
      return count
    })
    // 无法实时获取到 count 最新值
    console.log('setCount callback: ', count)
  }

  return <div>
    <button onClick={addCountAsync}>click async</button>
    <button onClick={addCountFlushSync}>click sync</button>
    <button onClick={addCountInCallback}>click callback</button>
    <div>count: {count}</div>
  </div>
}