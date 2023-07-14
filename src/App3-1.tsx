import React, { useState } from 'react'

import { createRoot, Root } from 'react-dom/client'

function ButtonCounter () {
  debugger
  console.log('call ButtonCounter')
  const [count, setCount] = useState<number>(0)

  const onClick = () => {
    debugger
    setCount(count + 1)
  }

  return <div className="button-counter-container">
    <div>counter: { count }</div>
    <button onClick={onClick}>You clicked me</button>  
  </div>
}

function App () {
  debugger
  console.log('call App')
  return <>
    <div>App</div>
    <ButtonCounter></ButtonCounter>
  </>
}

const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App />)

console.log(root1)

// 以上 demo
// 点击按钮，执行 setCount
// 执行到 flushSyncCallbacks 中的 callback(isSync)，即 performSyncWorkOnRoot
// var exitStatus = renderRootSync(root, lanes);
// workLoopSync -> performUnitOfWork -> beginWork
// var nextChildren = updateFunctionComponent(current, workInProgress, Component, resolvedProps, renderLanes);
// nextChildren 即 ButtonCounter 返回的 fiber node
// reconcileChildren(current, workInProgress, nextChildren, renderLanes);
// mountChildFibers 或 reconcileChildFibers 正式进入 reconciler 阶段

// React 的 scheduler 和 reconciler 只发生在『有状态更新的组件』内，但是：
// React 在 commit 阶段要从 root 开始遍历整个链表，经过漫长的以下两个阶段，即使只是以上 demo 简单的一个状态更新
// recursivelyTraverseMutationEffects
// commitMutationEffectsOnFiber

// Vue 则是将『影响』限制在当前发生数据变化的组件内
// https://github.com/zhaoyiming0803/test-code/blob/master/test287-1.html

