import React, { createContext, useContext, useState } from 'react'

import { createRoot } from 'react-dom/client'

const randomSort = (arr: Array<number | string>) => {
  const _arr: Array<number | string> = []
  while (arr.length > 0) {
    const random = Math.floor(Math.random() * arr.length)
    _arr.push(arr[random])
    arr.splice(random, 1)
  }
  return _arr

  // 一定要用上面的方法重新赋值一个数组，不能原地改变原数组，因为数组是对象，引用类型
  // 在 dispatchSetState 中用 objectIs(eagerState, currentState) 判断会是同一个对象
  // let i = 0

  // while (i++ < arr.length) {
  //   const random = Math.floor(Math.random() * arr.length)
  //   const start = arr[0]
  //   const end = arr[random]
  //   arr[0] = end
  //   arr[random] = start
  // }

  // return arr
}

debugger
const ThemeContext1 = createContext([])

function App1() {
  const [themeList, setThemeList] = useState<Array<string | number>>(['red', 'blue', 'green'])

  const onClickButton = () => {
    // const _themeList = themeList.sort(() => Math.random() - 0.5)
    debugger
    const _themeList = randomSort(themeList)

    setThemeList(_themeList)
  }

  debugger
  return (
    <div>
      <button onClick={onClickButton}>set theme list</button>

      {/** 重新给 Provider 的 defaultValue 赋值 */}
      {/** createElement 中赋值 config: { value: themeList }，最后返回 ReactElement(type, ......, props: { value: xxx, children: xxx }) */}
      {/** beginWork -> updateContextProvider -> pushProvider -> context._currentValue = nextValue; */}
      {/** Provider 是一个抽象组件，List1 的 owner 是 App1，而不是 Provider */}
      <ThemeContext1.Provider value={themeList}>
        <List1></List1>
      </ThemeContext1.Provider>
    </div>
  )
}

function List1() {
  debugger
  // readContext
  const themeList = useContext(ThemeContext1)
  return (
    <ul>
      {themeList.map((theme: string) => (
        <li key={theme}>{theme}</li>
      ))}
    </ul>
  )
}

const ThemeContext2 = createContext<{
  themeList: Array<number | string>
  setThemeList: React.Dispatch<Array<string | number>>
}>({
  themeList: [],
  setThemeList: (themeList: string[]) => themeList
})

function App2() {
  const [themeList, setThemeList] = useState<Array<number | string>>(['1', '2', '3'])

  return (
    <div>
      <ThemeContext2.Provider
        value={{
          themeList,
          setThemeList
        }}
      >
        <List2></List2>
      </ThemeContext2.Provider>
    </div>
  )
}

function List2() {
  const { themeList, setThemeList } = useContext(ThemeContext2)

  const onClickButton = () => {
    const _themeList = randomSort(themeList)
    setThemeList(_themeList)
  }

  return (
    <>
      <button onClick={onClickButton}>set theme list</button>
      <ul>
        {themeList.map((theme: string) => (
          <li key={theme}>{theme}</li>
        ))}
      </ul>
    </>
  )
}

const root = window.root = createRoot(document.querySelector('#root1'))

debugger
// App1 对应的 fiber
// var _created4 = createFiberFromElement(element, returnFiber.mode, lanes);
// _created4.ref = coerceRef(returnFiber, currentFirstChild, element);

// App1 的 fiber 的 return 指向 RootFiber
// _created4.return = returnFiber;
// return _created4;

// 然后 workInProgress = _created4，继续进入 workLoopSync 中的循环
// 在 beginWork 中判断 workInProgress.tag 为 IndeterminateComponent，即进入 mountIndeterminateComponent
// 执行 renderWithHooks，即运行每个函数组件：var children = Component(props, secondArg);

// ----------------------------
// App1 中 return 的内容作为 workInProgress.pendingProps，通过 reconcileChildren() 获得 workInProgress.child
// 本质上是将 tree 结构转为 link 结构
// https://github.com/zhaoyiming0803/test-code/blob/master/test367.js
// ----------------------------

// update 时
// 旧 tree node 结构存在于 fiber 的 memorizedProps 中
// 新 tree node 结构存在于 fiber 的 pendingProps 中
// 在 recursivelyTraverseMutationEffects 中遍历 link，渲染 dom
// 遍历 fiber 的路径参考：test-code/test367.js
root.render(<App1></App1>)

/**
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
  "div", 
  null,
  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      "button", 
      { onClick: onClickButton }, 
      "set theme list"
  ),
  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      ThemeContext1.Provider, 
      { value: themeList },
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        List1, 
        null
      )
  )
)
 */