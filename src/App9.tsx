import React, { useEffect, useState } from 'react'

import { createRoot, Root } from 'react-dom/client'

function Component () {
  // React 事件系统遵循规则：先捕获，再冒泡

  // on click App in capture
  // on click container in capture
  // on click button in capture

  // ********** 
  // native event 不在 React 事件系统中
  // 如果同时存在 React 事件和 native 事件，native 事件会按照『先捕获再冒泡』的顺序执行完（在 React 冒泡阶段开始执行）
  // on click app-container in capture by native event
  // on click component-container in capture by native event
  // on click component-container in bubble by native event
  // on click app-container in bubble by native event
  // **********

  // on click button in bubble
  // on click container in bubble
  // on click App in bubble
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

// getListener
// getFiberCurrentPropsFromNode（children、onClick、onClickCapture 等都挂载在 props 上）

// 第一步：先根据链表结构把所有的 React capture 事件找出来，然后 batchedUpdates
// 第二步：在 flushSyncCallbacksOnlyInLegacyMode 中执行所有的 native 事件（先捕获再冒泡），让出执行权，交给浏览器
// 第三步：先根据链表结构把所有的 React bubble 事件找出来，然后 batchedUpdates