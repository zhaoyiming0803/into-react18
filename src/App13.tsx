import React, { memo, useMemo, useState } from 'react'

import { createRoot, Root } from 'react-dom/client'

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
const MemoizedTips = memo(Tips)

function App () {
  const [tips, setTips] = useState<string>('Hello React')

  const [a, setA] = useState<number>(100)

  const [b, setB] = useState<number>(200)

  debugger
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
    // setTips(tips)
  }

  return <>
    <MemoizedTips tips={tips}></MemoizedTips>
    
    <div>c: {c}</div>
    
    <button onClick={changeA}>change a</button>
    
    <button onClick={changeB}>change b</button>
    
    <button onClick={changeTips}>change tips</button>
  </>
}

const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App />)

console.log(root1)
