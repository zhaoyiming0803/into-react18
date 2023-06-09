import React, { useEffect, useState } from 'react'

import { createRoot, Root } from 'react-dom/client'

function Component () {
  // https://github.com/zhaoyiming0803/test-code/blob/master/test350-event-react16.html
  // https://github.com/zhaoyiming0803/test-code/blob/master/test350-event-react18.html

  // 整体处理顺序：先捕获，再冒泡
  // React 事件捕获 -> 原生事件捕获 -> 原生事件冒泡 -> React 事件冒泡

  // on click document in capture by native event

  // on click App in capture
  // on click container in capture
  // on click button in capture
  // on click app-container in capture by native event
  // on click component-container in capture by native event

  // on click component-container in bubble by native event
  // on click app-container in bubble by native event
  // on click button in bubble
  // on click container in bubble
  // on click App in bubble

  // on click document in bubble by native event
  const onClickButtonCapture = () => {
    console.log('on click button in capture')
  }

  const onClickButtonBubble = () => {
    console.log('on click button in bubble')
  }

  const onClickContainerCapture = () => {
    console.log('on click container in capture')
  }

  const onClickContainerBubble = () => {
    console.log('on click container in bubble')
  }

  useEffect(() => {
    const container = document.querySelector('#component-container')
    
    container.addEventListener('click', function () {
      console.log('on click component-container in bubble by native event')
    }, false)

    container.addEventListener('click', function () {
      console.log('on click component-container in capture by native event')
    }, true)
  }, [])

  return <div id="component-container" onClickCapture={onClickContainerCapture} onClick={onClickContainerBubble}>
    <button onClickCapture={onClickButtonCapture} onClick={onClickButtonBubble}>Button</button>
  </div>
}

function App () {
  const onClickAppCapture = () => {
    console.log('on click App in capture')
  }

  const onClickAppBubble = () => {
    console.log('on click App in bubble')
  }

  useEffect(() => {
    document.addEventListener('click', () => {
      console.log('on click document in bubble by native event')
    }, false)

    document.addEventListener('click', () => {
      console.log('on click document in capture by native event')
    }, true)

    const container = document.querySelector('#app-container')
    
    container.addEventListener('click', function () {
      console.log('on click app-container in bubble by native event')
    }, false)

    container.addEventListener('click', function () {
      console.log('on click app-container in capture by native event')
    }, true)
  }, [])

  return <div id="app-container" onClickCapture={onClickAppCapture} onClick={onClickAppBubble}>
    <Component></Component>
  </div>
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
// 第二步：在 flushSyncCallbacksOnlyInLegacyMode 中执行所有的 native 事件（先捕获再冒泡）
// 第三步：先根据链表结构把所有的 React bubble 事件找出来，然后 batchedUpdates
