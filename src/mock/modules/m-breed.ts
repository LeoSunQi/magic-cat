/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-31 13:34:24
 * @LastEditTime: 2023-12-31 19:51:36
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import type { MockMethod } from 'vite-plugin-mock'
import type { Recordable } from '@/typings'
import { basicsResponse, paginationResponse } from '../utils'
import { Breeds, Macks } from '../datas/breed-data'
import { BREED_LIST_URL, MASK_LIST_URL } from '@/constants/api-constant'

const mack_list = {
  url: MASK_LIST_URL,
  method: 'post',
  response: (req: Recordable) => {
    const { pageNum = 1, pageSize = 15 } = req.body
    const data = paginationResponse({
      data: Macks.list,
      total: Macks.list.length,
      pageNum,
      pageSize,
    })
    return basicsResponse({ data })
  },
}

const breed_list = {
  url: BREED_LIST_URL,
  method: 'post',
  response: (req: Recordable) => {
    const { pageNum = 1, pageSize = 15 } = req.body
    const data = paginationResponse({
      data: Breeds.list,
      total: Breeds.list.length,
      pageNum,
      pageSize,
    })
    return basicsResponse({ data })
  },
}

export default [mack_list, breed_list] as MockMethod[]
