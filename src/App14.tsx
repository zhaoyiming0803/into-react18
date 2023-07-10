import React, { useState } from 'react'

import { createRoot, Root } from 'react-dom/client'

// mount

// updateContainer
// scheduleUpdateOnFiber
// ensureRootIsScheduled
// scheduleCallback
// requestHostCallback
// schedulePerformWorkUntilDeadline
// 至此，postMessage 后执行：performConcurrentWorkOnRoot

// renderRootSync
// prepareFreshStack
// createWorkInProgress
// workLoopSync
// performUnitOfWork(workInProgress)
  // beginWork, 在 beginWork 中不断给 workInProgress = next 赋值，然后在 workLoopSync 中循环执行 performUnitOfWork(workInProgress)，一旦 next 为 null 时，便执行 completeUnitOfWork
  
  // const current = unitOfWork.alternate
  // 根据 workInProgress，也就是 unitOfWork.tag 在 beginWork 中执行不同的操作，如：
  
  // tag = 3 时：
  // updateHostRoot
  // reconcileChildren

  // tag = 2 时
  // mountIndeterminateComponent
  // renderWithHooks, var Component = workInProgress.type; let children = Component(props, secondArg);
  // 如果是函数组件，执行 reconcileChildren；如果是 class 组件，执行 finishClassComponent

  // 一直顺着链表的 child 找到 ComponentA 组件的 <>ComponentA</> 这个 fiber，其没有 child 了，所以执行 completeUnitOfWork
  // next = completeWork(current, completedWork, subtreeRenderLanes);
  // 因为 ComponentA 是一个文本节点，没有 child 了，所以执行 var siblingFiber = completedWork.sibling;
  // 如果 siblingFiber !== null，则执行  workInProgress = siblingFiber; 同时结束本次 completeUnitOfWork 的执行，重新回到 workLoopSync 循环中
  // 否则执行 completedWork = returnFiber; workInProgress = completedWork;
  // completeUnitOfWork 中有 while，循环执行以上操作

// finishConcurrentRender
// commitRoot
// commitMutationEffects
// 根据 Fiber 链表结构关系（child, siblings, return）循环执行：commitMutationEffectsOnFiber
// commitReconciliationEffects
// 至此，App 组件渲染完毕
// 在 commitImpl 中还要再执行一次 ensureRootIsScheduled，防止有未提交的 effects
// flushSyncCallbacks
// 在 performConcurrentWorkOnRoot 中还要再执行一次 ensureRootIsScheduled

// --------------------------------------------------

// update

// dispatchSetState
// scheduleUpdateOnFiber(root, fiber, lane, eventTime)，第二个参数 fiber 指的是 WrappedComponent
// ensureRootIsScheduled
/**
 * debugger 时，偶然会走到下面的逻辑，但大部分时候不会
 * 
 if (existingCallbackPriority === newCallbackPriority && // Special case related to `act`. If the currently scheduled task is a
  // Scheduler task, rather than an `act` task, cancel it and re-scheduled
  // on the `act` queue.
  !( ReactCurrentActQueue$1.current !== null && existingCallbackNode !== fakeActCallbackNode)) {
    {
      // If we're going to re-use an existing task, it needs to exist.
      // Assume that discrete update microtasks are non-cancellable and null.
      // TODO: Temporary until we confirm this warning is not fired.
      if (existingCallbackNode == null && existingCallbackPriority !== SyncLane) {
        error('Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.');
      }
    } // The priority hasn't changed. We can reuse the existing task. Exit.


    return;
  }
 */
// 大部分情况不会走以上 case，通常是走 scheduleMicrotask
/**
 * 
 * scheduleMicrotask(function () {
    // In Safari, appending an iframe forces microtasks to run.
    // https://github.com/facebook/react/issues/22459
    // We don't support running callbacks in the middle of render
    // or commit so we need to check against that.
    if ((executionContext & (RenderContext | CommitContext)) === NoContext) {
      // Note that this would still prematurely flush the callbacks
      // if this happens outside render or commit phase (e.g. in an event).
      flushSyncCallbacks();
    }
  });
 */
// 异步任务到期后执行 flushSyncCallbacks
// 循环执行 queue 中的 callback，也就是 performSyncWorkOnRoot
// renderRootSync
// prepareFreshStack
// createWorkInProgress
// workLoopSync
// performUnitOfWork(workInProgress)
// beginWork
// 根据组件类型执行具体的更新，这里是 updateFunctionComponent
// renderWithHooks，var Component = workInProgress.type;
// bailoutOnAlreadyFinishedWork
// commitRoot
// commitMutationEffects
// 根据 Fiber 链表结构关系（child, siblings, return）循环执行：commitMutationEffectsOnFiber
// commitReconciliationEffects

function ComponentA () {
  debugger
  console.log('render ComponentA')
  return <>ComponentA</>
}

interface ComponentBProps {
  count: number
}

function ComponentB (props: ComponentBProps) {
  const { count } = props
  debugger
  console.log('render ComponentB')
  return <>ComponentB: { count }</>
}

// 编写高性能 React 代码要注意：高内聚、低耦合
// 组件功能尽量单一，一个组件只做一件事，读写分离
// 为了使 ComponentB 更新时，ComponentA 不更新
// 触发 setCount 的 hook 必须『单独』写在与 ComponentB 相关的组件中，这样 hook 触发组件更新时就不会影响到 ComponentA
// 事实上，count 与 ComponentA 无关 
// 原因如下：
// 所以这也是 React 的数据更新和渲染没有 Vue 的 template 高效精准的原因之一
/**
 * beginWork 函数中，在以下分支中 return 了，没有执行下面的 updateFunctionComponent，所以 ComponentA 函数不会再执行\
 * 原因是：beginWork 中的判断
 * 如果『读写分离』，则 oldProps === newProps && hasScheduledUpdateOrContext（主要是因为它），会执行 return attemptEarlyBailoutIfNoScheduledUpdate，不会执行后面的 updateFunctionComponent
 * 否则会执行后面的 updateFunctionComponent
 * 执行了 createWorkInProgress 函数，所以 workInProgress.pendingProps 永远不等于 workInProgress.memorizedProps， 因为 workInProgress.pendingProps = pendingProps 是外部传入的，及时 props 没有变化，其与原先的 memorizedProps 也不是同一个内存地址

 // Neither props nor legacy context changes. Check if there's a pending
 // update or context change.
var hasScheduledUpdateOrContext = checkScheduledUpdateOrContext(current, renderLanes);
 if (!hasScheduledUpdateOrContext && // If this is the second pass of an error or suspense boundary, there
    // may not be work scheduled on `current`, so we check for this flag.
    (workInProgress.flags & DidCapture) === NoFlags) {
      // No pending updates or context. Bail out now.
      didReceiveUpdate = false;
      return attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes);
    } 
 */
function WrappedComponent () {
  const [count, setCount] = useState<number>(0)

  const increaseCount = () => {
    debugger
    setCount(count + 1)
  }

  return <>
    <ComponentB count={count}></ComponentB>
    <button onClick={increaseCount}>Button</button>
  </>
}

function App () {
  return <>
    <ComponentA></ComponentA>
    <WrappedComponent></WrappedComponent>
  </>
}

// function App () {
//   const [count, setCount] = useState<number>(0)

//   return <>
//     <ComponentA></ComponentA>
//     <ComponentB count={count}></ComponentB>
//     <button onClick={() => {
//       debugger
//       setCount(count + 1)
//     }}>Button</button>
//   </>
// }

const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App />)

// @ts-ignore
window.root1 = root1
console.log(root1)
