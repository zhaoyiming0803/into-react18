import React from 'react'

import { createRoot, Root } from 'react-dom/client'

function App () {
  return <>
    <p><span>A</span><section>B</section></p>
    <a>C</a>
  </>
}

debugger
// createRoot
// createContainer
// createFiberRoot

// var root = new FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onRecoverableError);
// tag = 1 说明是 ConcurrentRoot tag = 0 说明是 LegacyRoot

// var uninitializedFiber = createHostRootFiber(tag, isStrictMode)

// FiberRoot 和 RootFiber 的关联关系
// root.current = uninitializedFiber
// uninitializedFiber.stateNode = root

// listenToAllSupportedEvents

// return new ReactDOMRoot(root);
const root1: Root = createRoot(document.querySelector('#root1'))

debugger
// createElement
/**
 var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    // 指向 App 组件
    type: type,
    
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };
 */
// updateContainer(children, root, null, null) // children 指向 element.type 即 App

// getCurrentUpdatePriority
// var update = createUpdate(eventTime, lane)

/**
 const update: Update<mixed> = {
    lane,

    tag: UpdateState,
    payload: null,
    callback: null,

    next: null,
  };
 */

// update.payload = { element } // element = children
// var root = enqueueUpdate(current$1, update, lane);
// enqueueConcurrentClassUpdate(fiber, sharedQueue, update, lane); // update 和 shared 形成循环链表
// scheduleUpdateOnFiber(root, current$1, lane, eventTime);
// markRootUpdated // lane = 16，eventTimes[4] = eventTime, lineToIndex() = 4
// ensureRootIsScheduled

// ------------------------------

// post message channel 后：
// performWorkUntilDeadline
// flushWork
// workLoop
// performConcurrentWorkOnRoot
// root.finishedWork = root.current.alternate
// renderRootSync
// workLoopSync
// performUnitOfWork
// beginWork
// updateHostRoot
// reconcileChildren
/**
 function reconcileChildren(current, workInProgress, nextChildren, renderLanes) {
  if (current === null) {
    // If this is a fresh new component that hasn't been rendered yet, we
    // won't update its child set by applying minimal side-effects. Instead,
    // we will add them all to the child before it gets rendered. That means
    // we can optimize this reconciliation pass by not tracking side-effects.
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderLanes);
  } else {
    // If the current child is the same as the work in progress, it means that
    // we haven't yet started any work on these children. Therefore, we use
    // the clone algorithm to create a copy of all the current children.
    // If we had any progressed work already, that is invalid at this point so
    // let's throw it out.
    workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren, renderLanes);
  }
}
 */
// finishConcurrentRender

// ------------------------------

// commitRoot - App4.tsx
root1.render(<App />)

console.log(root1)

