import * as React from 'react'
import { deepCopy } from '../utils/tools'

interface ICityItem {
  name: string
  id: number
  pid: number
  level: number,
  children?: ICityItem[]
}

interface IProps {
  path: number[]
  citys: ICityItem[],
  originCitys: ICityItem[],
  setCitys: (citys: ICityItem[]) => any
}

export default function CityItem<T extends IProps>(props: T) {
  return <>
    {
      Array.isArray(props.citys) && props.citys.map((city, index) => {
        const path = props.path.concat(index)
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const _citys = deepCopy(props.originCitys)
          const target = path.reduce((target, p, index) => {
            return index === path.length - 1
              ? target[p]
              : target[p].children
          }, _citys)
          target.name = e.target.value
          props.setCitys(_citys)
        }

        return <div style={{ marginLeft: 20 * city.level + 'px' }} key={index}>
          <input type="text" value={city.name} onChange={onChange} />
          <CityItem
            citys={city.children}
            setCitys={props.setCitys}
            path={path}
            originCitys={props.originCitys}>
          </CityItem>
        </div>
      })
    }
  </>
}
