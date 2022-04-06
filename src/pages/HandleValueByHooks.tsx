import React, { useState, useEffect, useRef } from 'react'
import { useScreenSize } from '@/hooks/useScreenSize'
import { login } from '@/apis/login'

function HandleValueByHooks() {
  const [count, setCount] = useState(0)
  const [screenSize] = useScreenSize()
  const [userInfo, setUserInfo] = useState(null)
  const statusRef = useRef(0)

  useEffect(() => {
    login('13100000000', '123').then(res => {
      setUserInfo(res.data)
    }).catch(() => {
      setUserInfo({})
    })
  }, [count])

  // hooks 修改值与 class 的 this.setState 不同
  // hooks 修改值都是异步的，无法在 console 中实时获取到修改后的最新值
  function changeCount() {
    setCount(count + 1)
    console.log('count: ', count)
  }

  function chagneCountInTimeout () {
    setTimeout(() => {
      setCount(count + 1)
      console.log('count in seteTimeout: ', count)
    })
  }

  // useRef 的值修改后可以在 console 中获取到最新值，但是不会触发组件重新渲染
  function changeStatus () {
    statusRef.current = statusRef.current + 1
    console.log('statusRef.current: ', statusRef.current)
  }

  return (
    <div>
      <div>screenSize: {screenSize}</div>

      <div>count: {count}</div>
      <div>status: {statusRef.current}</div>
      <button onClick={changeCount}>click count</button>
      <button onClick={chagneCountInTimeout}>click count in setTimeout</button>
      <button onClick={changeStatus}>click statusRef</button>

      <div>userInfo: {JSON.stringify(userInfo)}</div>
    </div>
  )
}

export default HandleValueByHooks
