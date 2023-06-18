import React, { useEffect, useState, useTransition } from 'react'

import { createRoot, Root } from 'react-dom/client'

// 整个过程是一个调度系统，随时可产生新的任务，在 scheduler 和 reconcile 阶段随时调整任务
// 最终根据任务的标识确定是否继续下一次调度，避免死循环。

// commitRoot
// commitImpl
// ensureRootIsScheduled
  // 以上三个步骤是连续循环执行的，终止条件为：
  // 一、没有可执行的任务了
  /**
   if (nextLanes === NoLanes) {
      // Special case: There's nothing to work on.
      if (existingCallbackNode !== null) {
        cancelCallback(existingCallbackNode);
      }
      root.callbackNode = null;
      root.callbackPriority = NoLane;
      return;
   }
  */
 // 二、Suspense 相关
 /**
  // If this root is currently suspended and waiting for data to resolve, don't
  // schedule a task to render it. We'll either wait for a ping, or wait to
  // receive an update.
  if (
    workInProgressSuspendedReason === SuspendedOnData &&
    workInProgressRoot === root
  ) {
    root.callbackPriority = NoLane;
    root.callbackNode = null;
    return;
  }
  */
 // 三：优先级相同的情况下，合并任务，一次性执行，以下 onClickWithoutTransition 中连续执行同一个 diapatcher 就是其中一种场景

 // 不满足以上三种情况，继续执行时：
 /**
  if (includesSyncLane(newCallbackPriority)) {
    scheduleMicrotask(() => {
      // In Safari, appending an iframe forces microtasks to run.
      // https://github.com/facebook/react/issues/22459
      // We don't support running callbacks in the middle of render
      // or commit so we need to check against that.
      if (
        (executionContext & (RenderContext | CommitContext)) ===
        NoContext
      ) {
        // Note that this would still prematurely flush the callbacks
        // if this happens outside render or commit phase (e.g. in an event).
        flushSyncCallbacks();
      }
    });
  } else {
    // .......
    newCallbackNode = scheduleCallback(
      schedulerPriorityLevel,
      performConcurrentWorkOnRoot.bind(null, root),
    )
  }
  */

// 所以 startTransition 内部操作：
// 通过控制各种变量状态，区别于 onClickWithoutTransition 两次手动触发 dispatcher，
// 绕过以上 ensureRootIsScheduled 的第三种 return 场景，避免合并渲染，分别触发 scheduleMicrotask 和 scheduleCallback
/**
  setPending(true);

  const prevTransition = ReactCurrentBatchConfig.transition;
  ReactCurrentBatchConfig.transition = ({}: BatchConfigTransition);
  const currentTransition = ReactCurrentBatchConfig.transition;

  setPending(false);
  callback();
 */

function App () {
  debugger
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<boolean>(false)

  const onClickWithTransition = () => {
    debugger
    // startTransition 内部自己执行 setPending(true) 和 setPending(false)
    startTransition(() => {
      // ...
    })
  }

  const onClickWithoutTransition = () => {
    debugger
    // 手动执行两次 diapatcher
    setStatus(true)
    setStatus(false)
  }

  // useEffect(() => {
  //   debugger
  //   console.log('isPending: ', isPending)
  //   console.log('status: ', status)
  // }, [isPending, status])

  return <>
    <button onClick={onClickWithTransition}>onClickWithTransition - {isPending ? 1 : 0}</button>
    <button onClick={onClickWithoutTransition}>onClickWithoutTransition - {status ? 1 : 0}</button>
  </>
}

const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App />)

console.log(root1)
