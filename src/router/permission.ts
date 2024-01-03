/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-28 20:35:48
 * @LastEditTime: 2024-01-03 10:00:22
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import router from '.'
import { getToken, getUser } from '@/utils/auth'
import { DOCUMENT_TITLE } from '@/constants/app-constant'
import useAppStore from '@/store/use-app'
import loginMap from './modules/login-map'

const module = loginMap.map((item) => item.path)
const whiteList = [...module, '/home', '/breed']

router.beforeEach((to, _, next) => {
  document.title = to.meta.title ? (to.meta.title as string) : DOCUMENT_TITLE
  const hasToken = getToken()
  const hasUser = getUser()
  if (hasToken) {
    // 有 token 已登录
    if (to.path === '/login') {
      next('/')
    } else {
      if (hasUser) {
        next()
      } else {
        const store = useAppStore()
        store.getUserInfo()
        next()
      }
    }
  } else {
    // 没有token 未登录
    if (whiteList.includes(to.path)) {
      // 包包含在白名单的可访问
      next()
    } else {
      // 需要认证后访问
      next(`/login?redirect=${to.path}`)
    }
  }
})
