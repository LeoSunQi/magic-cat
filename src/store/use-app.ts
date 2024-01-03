/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-29 09:27:41
 * @LastEditTime: 2024-01-03 09:58:47
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getSession, setSession } from '@/utils/storage'
import { maskSensitiveInfo } from '@/utils'
import {
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
} from '@/utils/auth'
import { ACTIVE_PATH } from '@/constants/app-constant'
import { showConfirmDialog, showToast } from 'vant'
import apis from '@/api'
import router from '@/router'

const useAppStore = defineStore('APP_STORE', () => {
  const isSignIn = ref(false)
  const userinfo = ref(getUser() ?? {})
  const defaultActivePath = ref((getSession(ACTIVE_PATH) ?? '/home') as string)

  const phone = computed(() => maskSensitiveInfo(userinfo.value.phone ?? ''))

  const sex = computed(() => {
    return userinfo.value.sex === 1
      ? '(先生)'
      : userinfo.value.sex === 2
        ? '(女士)'
        : '(先生/女士)'
  })

  const setSigIn = (sigin: boolean) => {
    isSignIn.value = sigin
  }

  const setActivePath = (active: string) => {
    defaultActivePath.value = active
    setSession(ACTIVE_PATH, active)
  }

  const setUserInfo = (user: Record<string, any>) => {
    userinfo.value = user
    setUser(JSON.stringify(user))
  }

  const getUserInfo = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { code, data } = await apis.MCommonUserInfo()
        if (+code === 0) {
          setUserInfo(data)
          resolve(data)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  const login = (form: object) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { code, data } = await apis.MCommonAuth(form)
        const { location } = router.options.history
        let new_path = '/profiles'
        const match = location.split('?redirect=') as RegExpMatchArray
        const regex = /details\b/
        if (match && match[1]) {
          new_path = regex.test(match[1]) ? '/home' : match[1]
        }
        if (+code === 0) {
          setToken(data.token)
          setUserInfo(data.user_info)
          router.push(new_path)
          resolve(data)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  const removeAll = () => {
    removeToken()
    removeUser()
  }

  const logout = () => {
    showConfirmDialog({
      title: '退出',
      message: '确定要退出登录吗？',
    }).then(() => {
      removeAll()
      router.push('/home')
      setActivePath('/home')
      showToast('您已成功登出')
    })
  }

  return {
    isSignIn,
    setSigIn,
    phone,
    sex,
    setUserInfo,
    getUserInfo,
    userinfo,
    setActivePath,
    defaultActivePath,
    removeAll,
    login,
    logout,
  }
})

export default useAppStore
