import React, { useState } from 'react'

import { createRoot, Root } from 'react-dom/client'

function App () {
  const [status, setStatus] = useState<boolean>(true)

  // 在React 18 中，新旧Fiber对比的顺序是先比较 key，再比较 type。
  // 这是因为 key 通常是唯一标识一个元素的，所以首先比较 key 可以更快地确定哪些元素需要更新、添加或删除。
  // 如果 key 相同，则会比较 type，以确定是否需要更新元素。

  // 修改 fiber 上的 pendingProps 属性，『就地复用、更新』
  // 然后 fiber.memoizedProps = fiber.pendingProps
  // 在 commit 阶段重新渲染

  // ----------------------------------------

  // 单节点对比

  // key 相同，type 相同
  // 使用 useFiber 直接复用节点
  // const a = <p>a</p>
  // const b = <p>b</p>

  // key 相同，type 不同
  // deleteRemainingChildren(returnFiber, child);
  // const a = <p>a</p>
  // const b = <span>b</span>

  // key 不同，type 不同
  // deleteChild(returnFiber, child);
  // const a = <p key="a">a</p>
  // const b = <p key="b">b</p>

  // ----------------------------------------

  // 多节点 diff

  // key 相同，type 相同
  // 使用 useFiber 直接复用
  const a = <>
    <p>A</p>
    <p>B</p>
    <p>C</p>
    <p>D</p>
  </>
  const b = <>
    <p>B</p>
    <p>D</p>
    <p>C</p>
    <p>A</p>
  </>

  // key 相同，type 不同
  // createFiberFromElement
  // const a = <>
  //   <p>0</p>
  //   <p>1</p>
  // </>
  // const b = <>
  //   <span>1</span>
  //   <span>0</span>
  // </>

  // key 不同
  // mapRemainingChildren
  // updateFromMap
  // updateElement
  // useFiber / createFiberFromElement
  // const a = <>
  //   <p key="a0">0</p>
  //   <p key="a1">1</p>
  // </>
  // const b = <>
  //   <p key="b1">1</p>
  //   <p key="b0">0</p>
  // </>

  // 新增节点
  // createChild
  // const a = <>
  //   <p key="0">0</p>
  //   <p key="1">1</p>
  // </>
  // const b = <>
  //   <p key="0">0</p>
  //   <p key="1">1</p>
  //   <p key="2">2</p>
  // </>

  // 删除节点
  // if (newIdx === newChildren.length) {
    // We've reached the end of the new children. We can delete the rest.
    // deleteRemainingChildren(returnFiber, oldFiber);
  // }
  // const a = <>
  //   <p key="0">0</p>
  //   <p key="1">1</p>
  //   <p key="2">2</p>
  // </>
  // const b = <>
  //   <p key="0">0</p>
  //   <p key="1">1</p>
  // </>

  return <div onClick={() => setStatus(!status)}>
    {status ? a : b}
  </div>
}

const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App />)

console.log(root1)
