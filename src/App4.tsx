import React, { useState } from 'react'

import { createRoot, Root } from 'react-dom/client'

function App () {
  const [status, setStatus] = useState<boolean>(true)

  // mount

  // commitRoot
  // commitRootImpl

  // commitMutationEffects

  // RootFiber 执行以下操作：
  // commitMutationEffectsOnFiber
  // recursivelyTraverseMutationEffects

  // App 根据组件执行以下操作：
  // commitMutationEffectsOnFiber
  // recursivelyTraverseMutationEffects
  // 在 recursivelyTraverseMutationEffects 中 parentFiber.subtreeFlags & MutationMask 为 false，所以不走 while 循环
  // 退到上一个调用栈，执行 commitReconciliationEffects，其参数 finishedWork 是 App 组件对应的 Fiber

  // 在 commitReconciliationEffects 中执行 commitPlacement
  // 在 commitPlacement 中执行 insertOrAppendPlacementNodeIntoContainer
  // 因为是初次 mount，所以会一次性 appendChild，即 document.querySelector('#root1').appendChild(App 组件对应的 dom，即绑定了 onClick 事件的 div 的 Fiber 对应的 stateNode)

  // ---------------------------------------------------------

  // update

  // commitRoot
  // commitRootImpl

  // commitMutationEffects
  // commitMutationEffectsOnFiber

  // RootFiber 及各普通节点的 Fiber 都会执行以下操作，直至 child 为 null
  // commitMutationEffectsOnFiber
  // recursivelyTraverseMutationEffects

  // child 为 null 时，发回上一个调用栈，执行：
  // commitReconciliationEffects，传入的参数 finishedWork 为最后一个没有 child 的 child
  // commitUpdate
  // 根据链表的 child、siblings、return 属性，依次执行 commitMutationEffectsOnFiber -> recursivelyTraverseMutationEffects -> commitReconciliationEffects-> commitUpdate


  // const a = <>
  //   <p>A</p>
  //   <p>B</p>
  //   <p>C</p>
  //   <p>D</p>
  // </>

  // const b = <>
  //   <p>B</p>
  //   <p>D</p>
  //   <p>C</p>
  //   <p>A</p>
  // </>

  // RootFiber -> App -> fragment -> p -> A / a text -> span -> p -> p.sibling -> fragment
  // 递归，子节点及子节点的 sibling 都遍历完，回到上一层节点
  const a = <>
    <p>A<span>B</span></p>
    <p>C</p>
  </>

  const b = <>
    <p>a<span>b</span></p>
    <p>c</p>
  </>

  return <div onClick={() => setStatus(!status)}>
    {status ? a : b}
  </div>
}

const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App />)

console.log(root1)
