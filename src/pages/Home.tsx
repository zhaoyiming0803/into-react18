import * as React from "react";
import { useState, Dispatch } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { User } from "@/types/index";
import { RootState } from "@/reducer/index";
import { addUser } from "@/action/index";
import { Button } from "antd-mobile";
import Tree from '../components/Tree'
import { deepCopy } from '../utils/tools'

interface Props {
  userList: User[];
  addUser: (user: User) => void;
}

const cityList = [
  { name: '北京市', id: 1, pid: 0, level: 0 },
  { name: '朝阳区', id: 2, pid: 1, level: 1 },
  { name: '将台', id: 3, pid: 2, level: 2 },
  { name: '望京', id: 4, pid: 2, level: 2 },
  { name: '山西省', id: 5, pid: 0, level: 0 },
  { name: '太原市', id: 6, pid: 5, level: 1 }
]

interface CityItem {
  name: string
  id: number
  pid: number
  level: number,
  children?: CityItem[]
}

function formatCityList (cityList: CityItem[], pid = 0): CityItem[] {
  let res: CityItem[] = []
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

function Home<T extends Props>(props: T) {
  console.log(props);
  const [count, setCount] = useState(0);
  const hisgory = useHistory();
  const [citys, setCitys] = useState(formatCityList(cityList))

  return (
    <div>
      <h1>Home</h1>
      {props.userList.map((user: User, index: number) => (
        <div key={index}>{user.name}</div>
      ))}
      <Button
        onClick={() => {
          setCount(count + 1);
          props.addUser({
            name: "user" + count,
          });
        }}
      >
        add user
      </Button>
      <Button onClick={() => hisgory.push("/coupon?a=1&b=2")}>
        to Coupon page
      </Button>
      <Button onClick={() => hisgory.push("/handleValueByHooks")}>
        to handle value by hooks page
      </Button>
      <div>
        {citys.map((city, index) => <Tree citys={citys} cityData={city} key={index} index={index} path={[]} setCitys={setCitys} onChange={(path: number[], value: string) => {
          const _citys = deepCopy(citys)
          let target = _citys
          path.forEach((p, i) => {
            if (i === path.length - 1) {
              target = target[p]
            } else {
              target = target[p].children
            }
          })
          target.name = value
          setCitys(_citys)
        }}></Tree>)}
      </div>
      <div>stringifyTreeData: { JSON.stringify(citys) }</div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  userList: state.user.userList,
});

interface Action {
  type: string;
  payload: User;
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  addUser: (user: User) => dispatch(addUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
