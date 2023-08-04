// https://www.npmjs.com/package/react-reconciler

import React from 'react'

import ReactReconciler from 'react-reconciler'

const rootHostContext = {}

const childHostContext = {}

const HostConfig = {
  supportsMutation: true,

  now: Date.now,

  getRootHostContext: () => {
    return rootHostContext
  },

  prepareForCommit: () => { },

  resetAfterCommit: () => { },

  getChildHostContext: () => {
    debugger
    return childHostContext
  },

  shouldSetTextContent: (type, props) => {
    debugger
    return typeof props.children === 'string' || typeof props.children === 'number'
  },

  // 这是 react-reconciler 想要根据目标创建 UI 元素实例的地方。
  // 由于我们的目标是 DOM，我们将创建 document.createElement 并且 type 是包含类型字符串的参数，
  // 如 div 或 img 或 h1 等。domElement 属性的初始值可以在此函数中从 newProps 参数设置
  createInstance: (type, newProps, rootContainerInstance, _currentHostContext, workInProgress) => {
    debugger
    const domElement = document.createElement(type)
    Object.keys(newProps).forEach(propName => {
      const propValue = newProps[propName]
      if (propName === 'children') {
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          domElement.textContent = propValue
        }
      } else if (propName === 'onClick') {
        domElement.addEventListener('click', propValue)
      } else if (propName === 'className') {
        domElement.setAttribute('class', propValue)
      } else {
        domElement.setAttribute(propName, propValue)
      }
    })
    return domElement
  },
  
  // 如果目标只允许在单独的文本节点中创建文本，则此函数用于创建单独的文本节点。
  createTextInstance: text => {
    debugger
    return document.createTextNode(text)
  },
  
  // 映射到 domElement.appendChild。此函数被调用以创建初始 UI 树。
  appendInitialChild: (parent, child) => {
    debugger
    parent.appendChild(child)
  },

  // 映射到 domElement.appendChild。类似于 appendInitialChild 但用于后续的树操作。
  appendChild(parent, child) {
    debugger
    parent.appendChild(child)
  },

  finalizeInitialChildren: (domElement, type, props) => { },

  // 映射到 domElement.appendChild。在 react-reconciler 的 commitPhase 中被调用
  appendChildToContainer: (parent, child) => {
    debugger
    parent.appendChild(child)
  },

  // 这是我们想要区分 oldProps 和 newProps 并决定是否更新的地方。在我们的实现中，为简单起见，我们只是将其设置为 true。
  prepareUpdate(domElement, oldProps, newProps) {
    debugger
    return true
  },
  
  // 此函数用于随后根据值更新domElement属性。newProps
  commitUpdate(domElement, updatePayload, type, oldProps, newProps) {
    debugger
    Object.keys(newProps).forEach(propName => {
      const propValue = newProps[propName]
      if (propName === 'children') {
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          domElement.textContent = propValue
        }
      } else {
        const propValue = newProps[propName]
        domElement.setAttribute(propName, propValue)
      }
    })
  },

  commitTextUpdate(textInstance, oldText, newText) {
    debugger
    textInstance.text = newText
  },
  
  // removeChild：映射到 domElement.removeChild。
  removeChild(parentInstance, child) {
    debugger
    parentInstance.removeChild(child)
  },

  clearContainer() {},

  removeChildFromContainer() {},

  detachDeletedInstance() {}
}

const ReactReconcilerInst = ReactReconciler(HostConfig)

const ReactDom = {
  render (reactElement, domElement, callback) {
    // Create a root Container if it doesnt exist
    if (!domElement._rootContainer) {
      domElement._rootContainer = ReactReconcilerInst.createContainer(domElement)
    }
    // update the root Container
    return ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainer, null, callback)
  }
}

function App () {
  return <Button content="Button"></Button>
}

function Button (props) {
  const { content } = props
  return <button>{content}</button>
}

ReactDom.render(<App></App>, document.querySelector('#root1'), function () {
  console.log('custom render successfully!!!')
})
