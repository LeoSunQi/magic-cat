/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-28 22:09:16
 * @LastEditTime: 2023-12-29 08:32:05
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('./modules/**/*.ts', {
  import: 'default',
  eager: true,
})
let mockModules: any[] = []

Object.keys(modules).forEach((key) => {
  mockModules = mockModules.concat(modules[key])
})

const customRouteMap: RouteRecordRaw[] = [...mockModules]

export default customRouteMap
