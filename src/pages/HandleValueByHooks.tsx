import * as React from 'react'
import { useState, useEffect } from 'react'
import { useScreenSize } from '@/hooks/useScreenSize'
import { login } from '@/apis/login'

function HandleValueByHooks() {
  const [count, setCount] = useState(0)
  const [screenSize] = useScreenSize()
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    login('13100000000', '123').then(res => {
      setUserInfo(res.data)
    }).catch(() => {
      setUserInfo({})
    })
  }, [count])

  function changeCount() {
    setCount(count + 1)
    // hooks 和 this.setState 一样，更新数据和视图都是异步的
    // 而 Vue，更新数据是同步的，更新视图是异步的
    console.log('count: ', count)
  }

  return (
    <div>
      <div>screenSize: {screenSize}</div>

      <div>count: {count}</div>
      <button onClick={changeCount}>click count</button>

      <div>userInfo: {JSON.stringify(userInfo)}</div>
    </div>
  )
}

export default HandleValueByHooks
