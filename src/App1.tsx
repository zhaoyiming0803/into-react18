import React from 'react'

import { createRoot, Root } from 'react-dom/client'

import { render } from 'react-dom'

interface AppProps {
  root: string
}

function App(props: AppProps) {
  const { root } = props
  return <>App: {root}</>
}

const root1: Root = createRoot(document.querySelector('#root1'))
root1.render(<App root="root1" />)


const root2: Root = createRoot(document.querySelector('#root2'))
root2.render(<App root="root2" />)

render(<App root="root3" />, document.querySelector('#root3'))

// 每次调用 createRoot 都首先创建一个 FiberRoot，然后在 FiberRoot 中创建 RootFiber 及一系列 FiberNode

/**
  var uninitializedFiber = createHostRootFiber(tag, isStrictMode);
  // rootFiber 与 FiberRoot 的关联关系
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;
 */