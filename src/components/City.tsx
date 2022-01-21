import * as React from 'react'
import { useState } from 'react'

import CityItem from './CityItem'

interface ICityItem {
  name: string
  id: number
  pid: number
  level: number,
  children?: ICityItem[]
}

const cityList: ICityItem[] = [
  { name: '北京市', id: 1, pid: 0, level: 0 },
  { name: '朝阳区', id: 2, pid: 1, level: 1 },
  { name: '将台', id: 3, pid: 2, level: 2 },
  { name: '望京', id: 4, pid: 2, level: 2 },
  { name: '山西省', id: 5, pid: 0, level: 0 },
  { name: '太原市', id: 6, pid: 5, level: 1 }
]

function formatCityList (cityList: ICityItem[], pid = 0): ICityItem[] {
  let res: ICityItem[] = []
  cityList.forEach(city => {
    if (city.pid === pid) {
      const children = formatCityList(cityList, city.id)
      if (children.length) {
        city.children = children
      }
      res.push(city)
    }
  })
  return res
}

export default function CityList () {
  const _cityList = formatCityList(cityList)
  const [citys, setCitys] = useState(_cityList)
  return <>
    <CityItem originCitys={_cityList} citys={citys} setCitys={setCitys} path={[]}></CityItem>
    <div>stringifyCitys: {JSON.stringify(citys)}</div>
  </>
}
