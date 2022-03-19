import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'


interface TestFuncComponentProps extends UserSectionProps {
  user: {
    name: string,
    age: number
  }
}

export default function TestFuncComponent (props: TestFuncComponentProps) {
  const [count, setCount] = useState(1)
  const list = [1, 2, 3, 4, 5]
  return <div>
    <FormComponent></FormComponent>
    <Count count={count} setCount={setCount}></Count>
    <DoubleNumberList list={list}></DoubleNumberList>
    {list.map(item => <Item value={item * count} key={item}></Item>)}
    {count % 2 === 0 && <UserSection user={props.user}></UserSection>}
  </div>
}

interface CountProps {
  count: number
  setCount: Function
}

function Count (props: CountProps) {
  const {
    count, 
    setCount
  } = props

  let timer: NodeJS.Timeout = null

  useEffect(() => {
    timer = setInterval(() => {
      setCount(count + 1)
    }, 1000)

    return () => {
      timer && clearInterval(timer)
    }
  })

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
        <input type="text" value={value} onChange />
        <select value={value} onChange={onChangeOptions}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>
    </form>
  </>
}