import React, { useState } from 'react'

import { createRoot } from 'react-dom/client'

function App () {
  return <div>
    <A></A>
    <B></B>
    <C message="this is message"></C>
  </div>
}

/**

function App() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(A, null),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(B, null),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(C, { message: "this is message" })
    );
}

*/

function A () {
  return <>A</>
}

function B () {
  const [count, setCount] = useState<number>(0)
  return <>
    <span>B</span>
    <button onClick={() => setCount(count + 1)}>{ count }</button>
  </>
}

interface CProps {
  message: string
}

function C (props: CProps) {
  const { message } = props

  return <div>
    <p>{ message }</p>
    <span>C1</span>
    <span>C2</span>
  </div>
}

const c = C({
  message: 'this is C function'
})

debugger
const root = createRoot(document.querySelector('#root1'))

debugger
root.render(<App />)

/**
 * 向下
 * beginWork
 * mountIndeterminateComponent
 * renderWithHook
 * reconcileChildren
 * .........
 * 直至 performUnitOfWork 函数中的 next = null
 
 * 向上
 * completeUnitOfWork
 
 * App 函数执行后的结果是一个深层嵌套且包含 children 的 tree node
 * 深度遍历，循环执行以上步骤，以此创建 fiber 链表结构。
 * ..........
 */

// tree node 与 link 之间的相互转换算法：
// https://github.com/zhaoyiming0803/test-code/blob/master/test367.js

// 类似的：
// https://github.com/zhaoyiming0803/test-code/blob/master/test374.js
