/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-31 13:36:48
 * @LastEditTime: 2023-12-31 19:25:16
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import Mock from 'mockjs'
import { CAT_INFO, COMMON } from './common-data'

export const Macks = Mock.mock({
  'list|40-100': [
    {
      ...COMMON,
      ...CAT_INFO,
    },
  ],
})

export const Breeds = Mock.mock({
  'list|10-40': [
    {
      ...COMMON,
      ...CAT_INFO,
    },
  ],
})
