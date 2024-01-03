/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-07 16:18:37
 * @LastEditTime: 2023-12-28 21:46:32
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import axios from 'axios'
import errorCode from './errorCode'
import { showNotify } from 'vant'

let requestNum = 0

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 15000,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    requestNum++
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const status = response.status || 200
    const message =
      response.data.message ||
      (errorCode as any)[status] ||
      errorCode['default']

    // 二进制数据则直接返回
    if (
      response.request.responseType === 'blob' ||
      response.request.responseType === 'arraybuffer'
    ) {
      return response.data
    }

    if (status === 200) {
      //const { options } = response.request.custom
      //console.log(`api:${options.url} => `, response.data)
      requestNum--
      if (requestNum === 0) {
      }
      return response.data
    } else if (status === 401) {
      // 跳转首页逻辑
      return Promise.reject(message)
    } else {
      showNotify({
        type: 'danger',
        message,
      })
      return Promise.reject(message)
    }
  },
  (error) => {
    let { message } = error
    if (message === 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Resquest failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }

    requestNum--
    if (requestNum === 0) {
      showNotify({
        type: 'danger',
        message,
        duration: 5 * 1000,
      })
    }

    return Promise.reject(error)
  },
)

export default service
