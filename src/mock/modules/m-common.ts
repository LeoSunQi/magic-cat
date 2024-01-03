/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-29 11:14:36
 * @LastEditTime: 2024-01-01 10:35:09
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import type { MockMethod } from 'vite-plugin-mock'
import type { Recordable } from '@/typings'
import { basicsResponse, paginationResponse } from '../utils'
import {
  CommonAuth,
  CommonBanner,
  CommonNotices,
  CommonSms,
  CommonUser,
} from '../datas/common-data'
import {
  COMMON_AUTH_URL,
  COMMON_NOTICE_URL,
  COMMON_SMS_URL,
  COMMON_SWIPE_BANNER_URL,
  COMMON_USER_INFO_URL,
} from '@/constants/api-constant'

const common_notices = {
  url: COMMON_NOTICE_URL,
  method: 'post',
  response: (req: Recordable) => {
    const { pageNum = 1, pageSize = 15 } = req.body
    const data = paginationResponse({
      data: CommonNotices.list,
      total: CommonNotices.list.length,
      pageNum,
      pageSize,
    })
    return basicsResponse({ data })
  },
}

const common_swipe_banner = {
  url: COMMON_SWIPE_BANNER_URL,
  method: 'post',
  response: () => basicsResponse({ data: CommonBanner.swipe }),
}

const common_user = {
  url: COMMON_USER_INFO_URL,
  method: 'get',
  response: () => basicsResponse({ data: CommonUser }),
}

const common_sms = {
  url: COMMON_SMS_URL,
  method: 'post',
  response: () => basicsResponse({ data: CommonSms }),
}

const common_auth = {
  url: COMMON_AUTH_URL,
  method: 'post',
  response: (req: Recordable) => {
    if (!req.body)
      return basicsResponse({ type: 'error', message: '参数不能为空' })
    return basicsResponse({ data: CommonAuth })
  },
}

export default [
  common_notices,
  common_swipe_banner,
  common_user,
  common_sms,
  common_auth,
] as MockMethod[]
