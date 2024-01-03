/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-09 16:59:53
 * @LastEditTime: 2024-01-03 09:49:14
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import Cookies from 'js-cookie'
import { USER_TOKEN, EXPIRES_TIME, USER_INFO } from '@/constants/app-constant'

export const getToken = () => Cookies.get(USER_TOKEN)

export const setToken = (token: string) =>
  Cookies.set(USER_TOKEN, token, { expires: EXPIRES_TIME })

export const removeToken = () => Cookies.remove(USER_TOKEN)

export const getUser = () =>
  Cookies.get(USER_INFO) ? JSON.parse(Cookies.get(USER_INFO) as string) : null

export const setUser = (userInfo: string) =>
  Cookies.set(USER_INFO, userInfo, { expires: EXPIRES_TIME })

export const removeUser = () => Cookies.remove(USER_INFO)
