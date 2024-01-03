/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-28 20:33:57
 * @LastEditTime: 2023-12-28 22:10:31
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import customRouteMap from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: customRouteMap,
})

export default router
