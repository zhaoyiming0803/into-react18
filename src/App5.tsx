import React, { useState } from 'react'

import { flushSync } from 'react-dom'

import { createRoot, Root } from 'react-dom/client'

function App () {
  // debugger
  const [count, setCount] = useState<number>(0)

  // 对于 onClickCount1、onClickCount2、onClickCount3 来说：
  // onClick 后执行 dispatchDiscreteEvent，一直到 batchedUpdates -> 『onClick 回调』 -> scheduleMicrotask -> flushSyncCallbacks -> performSyncWorkOnRoot -> commitRoot
  // 所以执行完 『onClick 回调』 后无法立刻获取到最新的 dom 值，因为后面才执行 commitRoot

  // dispatchEventsForPlugins
  // processDispatchQueue
  // executeDispatch
  // callCallback
  // 『onClick 回调』
  // flushSyncCallbacks，在 scheduleMicrotask 中

  // 在 performSyncWorkOnRoot 中赋值 finishedWork，来源于 RootFiber.alternate
  // var finishedWork = root.current.alternate;
  // root.finishedWork = finishedWork;
  // root.finishedLanes = lanes;
  // commitRoot()
  // ensureRootIsScheduled()

  const onClickCount1 = () => {
    debugger
    setCount(count + 1)
    // 内存中的 count 和 dom 中的 count 都不会实时更新，不是最新值
    console.log('count in onClickCount1: ', count, document.querySelector('#box').innerHTML)
  }

  const onClickCount2 = () => {
    setTimeout(() => {
      setCount(count + 1)
      // 内存中的 count 和 dom 中的 count 都不会实时更新，不是最新值
      console.log('count in onClickCount2: ', count, document.querySelector('#box').innerHTML)
    })
  }

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

  // flushSyncCallbacks
  // 判断条件 if (!isFlushingSyncQueue && syncQueue !== null) 中，isFlushingSyncQueue 为 false syncQueue 有值
        // performSyncWorkOnRoot
        // renderRootSync
        // workLoopSync
        // while 循环执行 performUnitOfWork
        // ***************
        // commitRoot
        // ***************

  // 下次执行 flushSyncCallbacks 时
  // 判断条件 if(!isFlushingSyncQueue && syncQueue !== null) 中 isFlushingSyncQueue 为 true，不成立，syncQueue 为 null，故不再执行，直接 return

  const onClickCount4 = () => {
    debugger
    flushSync(() => {
      setCount(count + 1)
    })
    // 内存中的 count 不是最新值
    // dom 中的 count 是最新值
    console.log('count in onClickCount4: ', count, document.querySelector('#box').innerHTML)
  }

  return <button onClick={onClickCount4} id="box">{count}</button>
}

const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App />)

console.log(root1)
