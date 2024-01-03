/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-29 08:10:57
 * @LastEditTime: 2023-12-29 08:26:34
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    meta: { title: '登录' },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/Register.vue'),
    meta: { title: '注册' },
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('@/views/login/Forget.vue'),
    meta: { title: '忘记密码' },
  },
  {
    path: '/agreement',
    name: 'Agreement',
    component: () => import('@/views/login/Agreement.vue'),
    meta: { title: '用户协议' },
  },
] as RouteRecordRaw[]
