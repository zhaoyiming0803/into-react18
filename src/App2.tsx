import React, { useState } from 'react'

import { createRoot, Root } from 'react-dom/client'

function App2 () {
  const [count, setCount] = useState<number>(0)
  const onClick = () => {
    debugger
    setCount(count + 1)
    // dispatchSetState
    // var root = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
    // flushSyncCallbacks
    // performSyncWorkOnRoot
    // renderRootSync
    // workLoopSync
    // ******
    // performUnitOfWork
    // ******
    // beginWork$1
    // beginWork
    // attemptEarlyBailoutIfNoScheduledUpdate
    // bailoutOnAlreadyFinishedWork
    // cloneChildFibers
    // createWorkInProgress

    // updateFunctionComponent

    // ********
    // reconcileChildren
    // reconcileChildFibers
    // ********
    
    // reconcileSingleElement
    // useFiber
    // createWorkInProgress
  }
  return <div onClick={onClick}>{count}</div>
}

const root: Root = createRoot(document.querySelector('#root1'))

debugger
// createWorkInProgress
// workInProgress.alternate = current
// current.alternate = workInProgress

root.render(<App2 />)
// updateContainer(children, root, null, null);
// scheduleUpdateOnFiber(root, current$1, lane, eventTime);
// ensureRootIsScheduled(root, eventTime);
// scheduleCallback(priorityLevel, callback);
// newCallbackNode = scheduleCallback$1(schedulerPriorityLevel, performConcurrentWorkOnRoot.bind(null, root));
// unstable_scheduleCallback
// requestHostCallback
// performWorkUntilDeadline
// setImmediate
// runIfPresent
// run
// performWorkUntilDeadline
// flushWork
// workloop
// performConcurrentWorkOnRoot
// renderRootSync
// workLoopSync
/**
 * while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
 */
