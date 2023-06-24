import React, { memo, useMemo, useState } from 'react'

import { createRoot, Root } from 'react-dom/client'

// beginWork
// updateSimpleMemoComponent
// !shallowEqual(prevProps, nextProps) && .... 时执行 updateFunctionComponent
function Tips (props: {
  tips: string
}) {
  debugger
  const { tips } = props

  return <>
    <p>{tips}</p>
  </>
}

debugger
// https://react.dev/reference/react/memo#troubleshooting

// memo 如果不传第二个参数，与普通组件没有任何区别，在父组件中是否需要重新渲染取决于 props 是否有变化

// mount 时：
// 在 beginWork 中执行 updateMemoComponent，如果 memo 如果没有第二个参数（Component.compare === null），则执行 workInProgress.tag = SimpleMemoComponent 修改其 tag 类型

// update 时：
// workInProgress.tag = 14（MemoComponent），执行 updateMemoComponent -> compare
// 否则 workInProgress.tag = 15（SimpleMemoComponent），执行 updateSimpleMemoComponent -> updateFunctionComponent

const MemoizedTips = memo(Tips)

function App () {
  const [tips, setTips] = useState<string>('Hello React')

  const [a, setA] = useState<number>(100)

  const [b, setB] = useState<number>(200)

  // debugger
  // mountWorkInProgressHook
  // 创建一个新的 hook，然后将所有的 workInProgressHook 通过 next 字段组成一个链表，useState, useMemo 都在一块

  // updateWorkInProgressHook
  // nextCurrentHook = currentHook.next

  // 更新时执行 updateMemo
  // 对比新旧 dependencies
  const c = useMemo(() => {
    return a + b
  }, [a, b])

  const changeA = () => {
    setA(Math.random())
  }

  const changeB = () => {
    setB(Math.random())
  }

  const changeTips = () => {
    setTips('Hello ' + Math.random())

    // 不会触发 Tips 组件重新渲染，没有走 debugger
    // debugger
    // setTips(tips)
  }

  return <>
    <MemoizedTips tips={tips}></MemoizedTips>
    
    <div>c: <span>{c}</span></div>
    
    <button onClick={changeA}>change a</button>
    
    <button onClick={changeB}>change b</button>
    
    <button onClick={changeTips}>change tips</button>
  </>
}

const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App />)

console.log(root1)
