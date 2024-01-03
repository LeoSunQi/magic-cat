/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-28 20:51:37
 * @LastEditTime: 2023-12-29 10:55:22
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */

export type Recordable<T = any> = Record<string, T>

export interface ResponseEntity {
  code: number
  message: string
  data: Recordable
}
