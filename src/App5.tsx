import React, { useState } from 'react'

import { flushSync } from 'react-dom'

import { createRoot, Root } from 'react-dom/client'

function App () {
  // debugger
  const [count, setCount] = useState<number>(0)

  // 对于 onClickCount1、onClickCount2、onClickCount3 来说：
  // onClick 后执行 dispatchDiscreteEvent，一直到 batchedUpdates -> 『onClick 回调』 -> scheduleMicrotask -> flushSyncCallbacks -> performSyncWorkOnRoot -> commitRoot
  // 所以执行完 『onClick 回调』 后无法立刻获取到最新的 dom 值，因为后面才执行 commitRoot

  // dispatchSetState
  // scheduleUpdateOnFiber
  // ensureRootIsScheduled
  // scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root))
    /**
         if (syncQueue === null) {
          syncQueue = [callback]
        } else {
          // Push onto existing queue. Don't need to schedule a callback because
          // we already scheduled one when we created the queue.
          syncQueue.push(callback);
        }
    */
  // ensureRootIsScheduled 中调用了 scheduleMicrotask，包装并异步执行 flushSyncCallbacks，这时：
  // 判断条件 if (!isFlushingSyncQueue && syncQueue !== null) 中，isFlushingSyncQueue 为 false syncQueue 有值

  // 注意与 onClickCount4 的区别
  const onClickCount1 = () => {
    debugger
    setCount(count + 1)
    setTimeout(() => {
      debugger
      // 此时，页面中 button 的值已经被渲染为 1，但内存中的 count 仍然为 0
      // 下面的 flushSync 执行完后打印的 count 不是最新值，同样的原因：
      // App10.tsx
      setCount(count + 100)
    }, 1000)
    // 内存中的 count 和 dom 中的 count 都不会实时更新，不是最新值
    console.log('count in onClickCount1: ', count, document.querySelector('#box').innerHTML)
  }

  // hook 的更新与 setTimeout 无关，这与 class 组件的 setState 的『合成事件』或『原生事件』不同
  const onClickCount2 = () => {
    setTimeout(() => {
      setCount(count + 1)
      // 内存中的 count 和 dom 中的 count 都不会实时更新，不是最新值
      console.log('count in onClickCount2: ', count, document.querySelector('#box').innerHTML)
    })
  }

  // useState 的 dispatch 传递函数，只是为了能处理更多的业务逻辑而已，与是否『同步』或『异步』刷新无关
  // 源码中有判断，如果是函数，则执行函数并获取 return 值。如果直接是值，则直接赋值
  const onClickCount3 = () => {
    setCount((count) => {
      return count + 1
    })
    // 内存中的 count 不是最新值
    // dom 中的 count 不是最新值
    console.log('count in onClickCount3: ', count, document.querySelector('#box').innerHTML)
  }

  // ----------------------------------

  // dispatchEventsForPlugins
  // processDispatchQueue
  // executeDispatch
  // callCallback
  // 『onClick 回调』
  // flushSync
    // dispatchState
    // ensureRootIsScheduled
    // scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root))
    /**
         if (syncQueue === null) {
          syncQueue = [callback]
        } else {
          // Push onto existing queue. Don't need to schedule a callback because
          // we already scheduled one when we created the queue.
          syncQueue.push(callback);
        }
    */

  // flushSyncCallbacks，注意这里的 flushSyncCallbacks 是在 flushSync 中被调用的，而 flushSync 是手动调用的
  // 判断条件 if (!isFlushingSyncQueue && syncQueue !== null) 中，isFlushingSyncQueue 为 false syncQueue 有值
        // performSyncWorkOnRoot
        // renderRootSync
        // workLoopSync
        // while 循环执行 performUnitOfWork
        // ***************
        // commitRoot
        // ***************

  // ensureRootIsScheduled 中调用了 scheduleMicrotask，所以 flushSyncCallbacks 最后还会被执行一次，但这时：
  // 判断条件 if(!isFlushingSyncQueue && syncQueue !== null) 中 isFlushingSyncQueue 为 true，不成立，syncQueue 为 null，故不再执行，直接 return

  const onClickCount4 = () => {
    debugger
    flushSync(() => {
      debugger
      setCount(count + 1)
      debugger
      // 此时，页面中 button 的值已经被渲染为 1，但内存中的 count 仍然为 0
      // // App10.tsx
      setCount(count + 100)
    })
    // 内存中的 count 不是最新值
    // dom 中的 count 是最新值
    console.log('count in onClickCount4: ', count, document.querySelector('#box').innerHTML)
  }

  return <button onClick={onClickCount1} id="box">{count}</button>
}

const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App />)

console.log(root1)

// Vue 数据更新是同步的，页面渲染是异步的

// Object.defineProperty 或 Proxy 都是放在闭包中代理某个值，
// 修改值后，使用 console.log 重新获取值，会触发 getter，从闭包中可以获取到最新的修改后的值，
// 但是此时页面尚未渲染，获取 dom 上还不是最新值，使用 nextTick 可以解决。

// https://github.com/zhaoyiming0803/test-code/blob/master/test285.html