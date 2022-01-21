import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios'

export interface ResponseData {
  code: number
  data?: any
  message: string
}

const apiBaseUrl = process.env.NODE_ENV === 'production'
  ? 'http://127.0.0.1:8092'
  : 'http://127.0.0.1:8092'

class HttpRequest {
  constructor(public baseUrl: string = apiBaseUrl) {
    this.baseUrl = baseUrl
  }

  public request (options: AxiosRequestConfig): AxiosPromise { 
    const instance: AxiosInstance = axios.create()
    options = this.mergeConfig(options)
    this.interceptors(instance, options.url)
    return instance(options)
  }

  private interceptors (instance: AxiosInstance, url?: string) {
    // 请求拦截
    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      return config
    }, error => Promise.reject(error))

    // 响应拦截
    instance.interceptors.response.use((res: AxiosResponse) => {
      return res
    }, error => Promise.reject(error))
  }

  private mergeConfig (options: AxiosRequestConfig): AxiosRequestConfig {
    return Object.assign({ baseURL: this.baseUrl }, options)
  }
}

export default HttpRequest