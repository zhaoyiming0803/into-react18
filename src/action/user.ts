import { ADD_USER } from './actionType'
import { IUser } from '@/types/user'

export const addUser = (payload: IUser) => {
  return {
    type: ADD_USER,
    payload
  }
}
