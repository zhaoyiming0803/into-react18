import React, { ChangeEvent, memo, useCallback, useEffect, useMemo, useState } from 'react'

export default function TestFuncComponent () {
  const [count, setCount] = useState(1)
  const list = [1, 2, 3, 4, 5]
  const user = {
    name: 'zhangsan',
    age: 18
  }
  return <div>
    <FormComponent></FormComponent>
    <DoubleNumberList list={list}></DoubleNumberList>
    {list.map(item => <Item value={item * count} key={item}></Item>)}
    
    <TestUseEffect count={count} setCount={setCount}></TestUseEffect>
    <TestUseCallback count={count}></TestUseCallback>
    <TestUseCallback1 count={count}></TestUseCallback1>
    <TestUseMemo count={count}></TestUseMemo>

    {count % 2 === 0 && <UserSection user={user}></UserSection>}
  </div>
}

interface CountProps {
  count: number
  setCount: Function
}

function TestUseEffect (props: CountProps) {
  const {
    count, 
    setCount
  } = props

  let timer: NodeJS.Timeout = null

  const [_count, _setCount] = useState(0)

  // useEffect可以帮助我们在DOM更新完成后执行某些副作用操作，如数据获取，设置订阅以及手动更改 React 组件中的 DOM 等
  // 有了useEffect，我们可以在函数组件中实现 像类组件中的生命周期那样某个阶段做某件事情,具有:
  // componentDidMount
  // componentDidUpdate
  // componentWillUnmount

  // useEffect 是在 render 之后浏览器已经渲染结束才执行

  // 根据第二个参数的不同情况，useEffect具有不同作用：

  // 1. 空数组
  // useEffect 只在第一次渲染后执行，由于空数组中没有值，始终没有改变，所以后续 render 不执行，相当于生命周期中的 componentDidMount

  // 2. 非空数组
  // 无论数组中有几个元素，数组中只要有任意一项发生了改变，useEffect 都会执行

  // 3、不传
  // 当前组件每次重新渲染后都执行

  // useEffect 可以返回一个函数，它在当前组件销毁时被调用

  useEffect(() => {
    timer = setInterval(() => {
      setCount(count + 1)
    }, 1000)

    console.log('call useEffect')

    return () => {
      timer && clearInterval(timer)
    }
  })

  console.log('TestUseEffect re-render')

  return <div>count: {count}</div>
}

interface UserSectionProps {
  user: {
    name: string,
    age: number
  }
}

function UserSection (props: UserSectionProps) {
  return <>
    <div>name: {props.user.name}</div>
    <div>age: {props.user.age}</div>
  </>
}

interface DoubleNumberListProps {
  list: number[]
}

function DoubleNumberList (props: DoubleNumberListProps) {
  return <ul>
    {props.list.map(item => <li key={item}>{item * 2}</li>)}
  </ul>
}

interface ItemProps {
  value: number
}

function Item (props: ItemProps) {
  return <div>{props.value}</div>
}

function FormComponent () {
  const [value, setValue] = useState('A')

  function onChangeOptions (e: ChangeEvent) {
    console.log('---- e ---: ', e)
  }
  return <>
    <form>
      <div>
        {/* <input type="text" value={value} /> */}
        <select value={value} onChange={onChangeOptions}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>
    </form>
  </>
}

// useCallback 类似于类组件中的 shouldComponentUpdate，在子组件中使用 shouldComponentUpdate，
// 判定该组件的 props 和 state 是否有变化，从而避免每次父组件render时都去重新渲染子组件。
interface TestUseCallbackProp {
  count: number
}

function TestUseCallback (props: TestUseCallbackProp) {
  const { count } = props
  
  const memoizedCallback = useCallback(() => {
    return () => {
      return <div>Child component in useCallback: {count}</div>
    }
  }, [count])

  const Child = memoizedCallback()

  return <Child></Child>
}

let cachedMemorizedCallback: Function

function TestUseCallback1 (props: TestUseCallbackProp) {
  const { count } = props
  const memoizedCallback = useCallback(() => {
    console.log('TestUseCallback1')
  }, [count])

  // memoizedCallback 就是 useCallback 的回调函数本身，但不是同一个内存地址
  // typeof memoizedCallback === 'function' // true
  console.log('memoizedCallback in TestUseCallback1: ', memoizedCallback)

  if (!cachedMemorizedCallback) {
    cachedMemorizedCallback = memoizedCallback
  } else {
    // false
    console.log('cachedMemorizedCallback === memoizedCallback: ', cachedMemorizedCallback === memoizedCallback)
  }

  // memorizedCallback 会变化
  useEffect(() => {
    console.log('watch memorizedCallback')
  }, [memoizedCallback])

  return <></>
}

interface TestUseMemoProp {
  count: number
}

// useMemo 返回一个缓存的值，避免未变化的值随着组件的 re-render 而重新计算
// Remember that the function passed to useMemo runs during rendering. 
// Don’t do anything there that you wouldn’t normally do while rendering. 
// For example, side effects belong in useEffect, not useMemo
function computeExpensiveValue (count: number) {
  return Math.pow(count, 2)
}

function TestUseMemo (props: TestUseMemoProp) {
  const { count } = props
  const [_count, _setCount] = useState(0)
  let timer: NodeJS.Timeout = null

  // 当前 useMemo 无依赖，所以当前组件每次 re-render，useMemo callback 都不会被重复执行，它只会在组件渲染后执行一次
  const memorizedValue = useMemo(() => {
    console.log('call useMemo')
    return computeExpensiveValue(count)
  }, [])

  useEffect(() => {
    timer = setInterval(() => {
      _setCount(_count + 1)
    }, 1000)
    return () => {
      timer && clearTimeout(timer)
    }
  })

  console.log('TestUseMemo re-render')

  return <div>memorizedValue: {memorizedValue}</div>
}
