import React, { useEffect } from 'react'

import { createRoot, Root } from 'react-dom/client'

// https://github.com/zhaoyiming0803/test-code/blob/master/test350-event-react16.html
// https://github.com/zhaoyiming0803/test-code/blob/master/test350-event-react18.html

// Vue 处理 @click 事件则不是事件委托，而是直接绑定到 DOM
// https://github.com/zhaoyiming0803/test-code/blob/master/test287.html

// 原生事件处理
// https://github.com/zhaoyiming0803/test-code/blob/master/test350-dom-events.html

// 事件监听『全部绑定在 root1 上』，所以，原生事件和 React 事件都保持统一的调用顺序，先捕获再冒泡
// 这与 App9.tsx 中的测试不同

// on click root1 in capture by native event out of Component
// on click App in capture
// on click root1 in capture by native event in Component

// on click root1 in bubble by native event out of Component
// on click App in bubble
// on click root1 in bubble by native event in Component

let isFirstExecutionInCapture = true
let isFirstExecutionInBubble = true
const root1Element = document.querySelector('#root1') as Element
    
root1Element.addEventListener('click', function () {
  if (isFirstExecutionInBubble) {
    console.log('on click root1 in bubble by native event out of Component')
  }
  isFirstExecutionInBubble = false
}, false)

root1Element.addEventListener('click', function () {
  if (isFirstExecutionInCapture) {
    console.log('on click root1 in capture by native event out of Component')
  }
  isFirstExecutionInCapture = false
}, true)

function App () {
  const onClickAppCapture = () => {
    console.log('on click App in capture')
  }

  const onClickAppBubble = () => {
    console.log('on click App in bubble')
  }

  useEffect(() => {
    const root1 = document.querySelector('#root1')
    
    root1.addEventListener('click', function () {
      console.log('on click root1 in bubble by native event in Component')
    }, false)

    root1.addEventListener('click', function () {
      console.log('on click root1 in capture by native event in Component')
    }, true)
  }, [])

  return <button 
    onClickCapture={() => {
      debugger
      onClickAppCapture()
    }} 
    onClick={() => {
      debugger
      onClickAppBubble()
    }}>
    Button
  </button>
}

debugger
const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App />)

console.log(root1)


// createRoot 时将所有的事件都绑定到 root 节点
// render 后获取到完成的链表结构
// 触发事件后，根据链表结构找到对应的绑定在 dom 上的捕获或冒泡事件（getListener），执行对应的 listener（batchedUpdates）
// https://github.com/zhaoyiming0803/test-code/blob/master/test350.html


// getListener
// getFiberCurrentPropsFromNode（children、onClick、onClickCapture 等都挂载在 props 上）

// 第一步：先根据链表结构把所有的 React capture 事件找出来，然后 batchedUpdates
// 第二步：在 flushSyncCallbacksOnlyInLegacyMode 中执行所有的 native 事件（先捕获再冒泡），让出执行权，交给浏览器
// 第三步：先根据链表结构把所有的 React bubble 事件找出来，然后 batchedUpdates