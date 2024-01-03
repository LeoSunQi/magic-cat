/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2024-01-01 15:34:13
 * @LastEditTime: 2024-01-02 20:48:27
 * Copyright (c) 2024 by LeoSunQi, All Rights Reserved.
 */
import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/owners/:id',
    name: 'Owners',
    component: () => import('@/views/common/Owners.vue'),
    meta: { title: '他的魔力猫' },
  },
  {
    path: '/result/:type',
    name: 'Result',
    component: () => import('@/views/common/Result.vue'),
    meta: { title: '购买成功/失败' },
  },
] as RouteRecordRaw[]
