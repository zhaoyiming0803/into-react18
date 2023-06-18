import React, { lazy, Suspense } from 'react'

import { createRoot, Root } from 'react-dom/client'

import { Loading } from './Loading'

// https://github.com/zhaoyiming0803/into-react18/blob/test-react18/src/components/ReactAsyncLoader.tsx


/**
 do {
    try {
      workLoopSync();
      break;
    } catch (thrownValue) {
      handleError(root, thrownValue);
    }
  } while (true);
 */
// beginWork
// mountLazyComponent
// 因为 lazy 包装的组件返回 Promise，而且首次是 pending 状态，所以 throw error
// 再次回到上面 do while 中的 workLoopSync 中
// lazyInitializer 的 then 回调，lazyComponent 的 _result 被赋予最终的值
// return moduleObject.default;
const delay = async (promise: Promise<any>) => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  }).then(() => promise)
}

debugger
const MyComponent = lazy(() => delay(import('./MyComponent')))

function App () {
  debugger
  // showFallback 变量控制展示 fallback 或 children
  // lazy 状态变化后，在 then 中执行：
    // pingSuspendedRoot
    // ensureRootIsScheduled
    // 重新执行：
    // beginWork
    // updateSuspenseComponent
    // 这时在 Suspense 组件内 showFallback 为 false，执行 mountSuspensePrimaryChildren
  return <Suspense fallback={<Loading />}>
    <MyComponent></MyComponent>
  </Suspense>
}

const root1: Root = createRoot(document.querySelector('#root1'))

root1.render(<App />)

console.log(root1)
