import * as React from 'react'
import { useState } from 'react'
import { deepCopy } from '../utils/tools'

interface CityItem {
  name: string
  id: number
  pid: number
  level: number,
  children?: CityItem[]
}

interface Props {
  key: number
  index: number
  path: number[]
  cityData: CityItem,
  citys: CityItem[],
  onChange (path: number[], value: string): any,
  setCitys (citys: CityItem[]): any
}

export default function Tree<T extends Props> (props: T) {
  const [cityData, setCityName] = useState(props.cityData)
  const path = props.path.concat(props.index)
  return (
    <div>
      <div style={{marginLeft: 20 * cityData.level + 'px'}}>
        <input type="text" value={ cityData.name } onChange={e => {
          // 受控组件，同步修改 input 框中的值
          setCityName({
            ...cityData,
            name: e.target.value
          })
          // 在父组件中修改 value
          props.onChange(path, e.target.value)
        }} />
      </div>
      {
        Array.isArray(cityData.children) && cityData.children.map((city, index) => <Tree citys={props.citys} cityData={city} key={index} index={index} path={path} setCitys={props.setCitys} onChange={(path: number[], value: string) => {
          const _citys = deepCopy(props.citys)
          const target = path.reduce((target, p, index) => {
            if (index === path.length - 1) {
              return target[p]
            } else {
              return target[p].children
            }
          }, _citys)
          target.name = value
          props.setCitys(_citys)
        }}></Tree>)
      }
    </div>
  )
}