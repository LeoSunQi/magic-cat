/*
 * @Description: 
 * @Author: LeoSunQi
 * @Date: 2023-12-28 19:51:49
 * @LastEditTime: 2023-12-28 20:27:13
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'js-cookie' 