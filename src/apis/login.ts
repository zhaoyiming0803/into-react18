import httpRequest, { ResponseData } from './index'
import { AxiosPromise } from 'axios'

export const login = (phone: string, pwd: string): AxiosPromise<ResponseData> => {
  return httpRequest.request({
    method: 'post',
    url: '/auth/login',
    data: { phone, pwd }
  })
}
