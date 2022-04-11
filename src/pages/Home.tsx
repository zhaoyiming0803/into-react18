import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { Button } from 'antd-mobile'
import User from '../components/User'
import City from '../components/City'

import { Timeline } from '../components/Timeline/Timeline'

function Home () {
  const history = useHistory()
  
  return (
    <div>
      <h1>Home</h1>
      <User count={1}></User>
      
      <Button onClick={() => history.push('/coupon?a=1&b=2')}  className="gotoCouponPage">
        to Coupon page
      </Button>

      <Button onClick={() => history.push('/handleValueByHooks')}>
        to handle value by hooks page
      </Button>

      <Button onClick={() => history.push('/testReact18')}>to Test18 page</Button>

      <Button onClick={() => history.push('/testFuncComponent')}>to TestFuncComponent page</Button>

      <City></City>

      <Timeline>
        <Timeline.Item label={<div>Label</div>} color="red">
          123
        </Timeline.Item>
        <Timeline.Item>
          456
        </Timeline.Item>
      </Timeline>
    </div>
  )
}

export default Home
