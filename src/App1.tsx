import React, { useEffect, useLayoutEffect, useState } from 'react'

import { createRoot, Root } from 'react-dom/client'

function App () {
  const [count, setCount] = useState<number>(0)

  // https://react.dev/reference/react/useLayoutEffect

  // useLayoutEffect 总是在 DOMContentLoaded 前执行，useEffect 不一定
  // ------------------------
  // useLayoutEffect 与 useEffect 的区别主要在首次 mount 阶段
  // ------------------------
  // commitRoot -> ensureRootIsScheduled -> scheduleCallback$1
  /**
   * scheduleCallback$1(NormalPriority, function () {
      // flushPassiveEffects 中触发 useEffect 回调，被包装在 scheduleCallback 中
      // commitLayoutEffects（同步先执行） 和 flushPassiveEffects（异步后执行）
      // 所以用 useLayoutEffect 可以在首次 mount 时今早的执行回调
      flushPassiveEffects(); // This render triggered passive effects: release the root cache pool
      // *after* passive effects fire to avoid freeing a cache pool that may
      // be referenced by a node in the tree (HostRoot, Cache boundary etc)

      return null;
    });
   */

  // 在 update 阶段，useLayoutEffect 与 useEffect 在 commitRoot 中同步先后被执行，没什么区别，只是 useLayoutEffect 执行在前而已

  // commitHookEffectListMount 最核心的作用就是执行 useEffect 或 useLayoutEffect 的第一个参数（函数）

  // commitMutationEffects - 用于渲染、更新 dom
  // commitLayoutEffects
  // requestPaint
  // onCommitRoot
  // ensureRootIsScheduled
  // flushPassiveEffects

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
    // 不要这样写
    // setCount(10000)
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
