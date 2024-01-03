/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-29 08:30:09
 * @LastEditTime: 2023-12-29 17:49:10
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import type { RouteRecordRaw } from 'vue-router'
import TabbarLayout from '@/layout/TabbarLayout.vue'

export default [
  {
    path: '/',
    redirect: '/home',
    component: TabbarLayout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/tabbar/Home.vue'),
        meta: { title: '首页' },
      },
      {
        path: '/breed',
        name: 'Breed',
        component: () => import('@/views/tabbar/Breed.vue'),
        meta: { title: '繁育' },
      },
      {
        path: '/profiles',
        name: 'Profiles',
        component: () => import('@/views/tabbar/Profiles.vue'),
        meta: { title: '我的' },
      },
    ],
  },
] as RouteRecordRaw[]
