import * as React from 'react'
import { useState } from 'react'
import { flushSync } from 'react-dom'

interface Props {

}

export default function TestReact18<T extends Props> (props: T) {
  const [count, setCount] = useState(0)

  const addCountAsync = () => {
    debugger
    setCount(count + 1)
    // 无法实时获取到 count 最新值
    console.log('async count: ', count)
  }

  const addCountSync = () => {
    debugger
    flushSync(() => {
      setCount(count + 1)
      // 无法实时获取到 count 最新值
      console.log('sync count: ', count)
    })
  }

  return <div>
    <button onClick={addCountAsync}>click async</button>
    <button onClick={addCountSync}>click sync</button>
    <div>count: {count}</div>
  </div>
}