import * as React from 'react'
import { Dispatch } from 'react'
import { connect } from 'react-redux'

import { RootState } from '@/reducer/index'
import { addUser } from '@/action/index'

import { Button } from 'antd-mobile'
import { IUser } from '@/types/index'

interface IProps {
  userList: IUser[];
  addUser: (user: IUser) => void;
}

function User<T extends IProps> (props: T) {
  const addUser = () => {
    props.addUser({
      name: 'user' + Math.random()
    })
  }

  return <>
    {
      props.userList.map((user: IUser, index: number) => (
        <div key={index}>{user.name}</div>
      ))
    }
    <Button onClick={() => addUser()}>add user</Button>
  </>
}

const mapStateToProps = (state: RootState) => ({
  userList: state.user.userList
})

interface Action {
  type: string
  payload: IUser
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  addUser: (user: IUser) => dispatch(addUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
