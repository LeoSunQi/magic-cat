/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-30 20:59:58
 * @LastEditTime: 2023-12-31 12:40:16
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import type { MockMethod } from 'vite-plugin-mock'
import type { Recordable } from '@/typings'
import { basicsResponse, paginationResponse } from '../utils'
import {
  PROFILES_CAT_CURRENCY_URL,
  PROFILES_INVITATION_RECORD_URL,
  PROFILE_MY_CAT_URL,
  PROFILE_ORDER_URL,
  PROFILE_PANNIER_URL,
} from '@/constants/api-constant'
import {
  ProfilesInvitationRecord,
  ProfilesCatCurrency,
  ProfileMyCat,
  ProfilePannier,
  ProfileOrder,
} from '../datas/profiles-data'

const profile_order = {
  url: PROFILE_ORDER_URL,
  method: 'post',
  response: (req: Recordable) => {
    const { pageNum = 1, pageSize = 15 } = req.body
    const data = paginationResponse({
      data: ProfileOrder.list,
      total: ProfileOrder.list.length,
      pageNum,
      pageSize,
    })
    return basicsResponse({ data })
  },
}

const profile_pannier = {
  url: PROFILE_PANNIER_URL,
  method: 'post',
  response: (req: Recordable) => {
    const { pageNum = 1, pageSize = 15 } = req.body
    const data = paginationResponse({
      data: ProfilePannier.list,
      total: ProfilePannier.list.length,
      pageNum,
      pageSize,
    })
    return basicsResponse({ data })
  },
}

const profile_my_cat = {
  url: PROFILE_MY_CAT_URL,
  method: 'post',
  response: (req: Recordable) => {
    const { pageNum = 1, pageSize = 15 } = req.body
    const data = paginationResponse({
      data: ProfileMyCat.list,
      total: ProfileMyCat.list.length,
      pageNum,
      pageSize,
    })
    return basicsResponse({ data })
  },
}

const profiles_cat_currency = {
  url: PROFILES_CAT_CURRENCY_URL,
  method: 'post',
  response: (req: Recordable) => {
    const { pageNum = 1, pageSize = 15 } = req.body
    const data = paginationResponse({
      data: ProfilesCatCurrency.list,
      total: ProfilesCatCurrency.list.length,
      pageNum,
      pageSize,
    })
    return basicsResponse({ data })
  },
}

const profiles_invitation_record = {
  url: PROFILES_INVITATION_RECORD_URL,
  method: 'post',
  response: (req: Recordable) => {
    const { pageNum = 1, pageSize = 15 } = req.body
    const data = paginationResponse({
      data: ProfilesInvitationRecord.list,
      total: ProfilesInvitationRecord.list.length,
      pageNum,
      pageSize,
    })
    return basicsResponse({ data })
  },
}

export default [
  profile_order,
  profile_pannier,
  profile_my_cat,
  profiles_cat_currency,
  profiles_invitation_record,
] as MockMethod[]
