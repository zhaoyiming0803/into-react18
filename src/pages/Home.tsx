import * as React from 'react'
import { useHistory } from 'react-router-dom'

import { Button } from 'antd-mobile'
import User from '../components/User'
import City from '../components/City'

function Home () {
  const hisgory = useHistory()
  
  return (
    <div>
      <h1>Home</h1>

      <User></User>
      
      <Button onClick={() => hisgory.push('/coupon?a=1&b=2')}  className="gotoCouponPage">
        to Coupon page
      </Button>

      <Button onClick={() => hisgory.push('/handleValueByHooks')}>
        to handle value by hooks page
      </Button>

      <City></City>
    </div>
  )
}

export default Home
