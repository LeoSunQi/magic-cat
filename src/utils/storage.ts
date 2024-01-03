/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-07 15:34:49
 * @LastEditTime: 2023-12-28 21:48:54
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
export const setSession = <T>(key: string, value: T) => {
  if (typeof value === 'object') {
    return sessionStorage.setItem(key, JSON.stringify(value))
  }
  return sessionStorage.setItem(key, value as string)
}

export const getSession = (key: string) => {
  const value = sessionStorage.getItem(key)
  if (value === 'true' || value === 'false') {
    return JSON.parse(value) as boolean
  }
  return value
}

export const getSessionJson = (key: string) => {
  const value = sessionStorage.getItem(key)
  return JSON.parse(value as string)
}

export const removeSession = (key: string) => {
  return sessionStorage.removeItem(key)
}

export const clearSession = () => {
  return sessionStorage.clear()
}
