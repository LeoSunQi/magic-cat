/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-31 13:40:23
 * @LastEditTime: 2023-12-31 18:23:50
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import { BREED_LIST_URL, MASK_LIST_URL } from '@/constants/api-constant'
import type { Recordable, ResponseEntity } from '@/typings'
import request from '@/utils/request'

const MMackList = (data?: Recordable): Promise<ResponseEntity> =>
  request({
    url: MASK_LIST_URL,
    method: 'POST',
    data,
  })

const MBreedList = (data?: Recordable): Promise<ResponseEntity> =>
  request({
    url: BREED_LIST_URL,
    method: 'POST',
    data,
  })

const M_BREED = {
  MMackList,
  MBreedList,
}

export default M_BREED
