/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-29 11:51:18
 * @LastEditTime: 2023-12-31 16:43:09
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import {
  COMMON_AUTH_URL,
  COMMON_NOTICE_URL,
  COMMON_SMS_URL,
  COMMON_SWIPE_BANNER_URL,
  COMMON_USER_INFO_URL,
} from '@/constants/api-constant'
import type { Recordable, ResponseEntity } from '@/typings'
import request from '@/utils/request'

const MCommonNotices = (data?: Recordable): Promise<ResponseEntity> =>
  request({
    url: COMMON_NOTICE_URL,
    method: 'POST',
    data,
  })

const MCommonSwipeBanner = (data?: Recordable): Promise<ResponseEntity> =>
  request({
    url: COMMON_SWIPE_BANNER_URL,
    method: 'POST',
    data,
  })

const MCommonUserInfo = (): Promise<ResponseEntity> =>
  request({
    url: COMMON_USER_INFO_URL,
    method: 'GET',
  })

const MCommonSms = (data?: Recordable): Promise<ResponseEntity> =>
  request({
    url: COMMON_SMS_URL,
    method: 'POST',
    data,
  })

const MCommonAuth = (data?: Recordable): Promise<ResponseEntity> =>
  request({
    url: COMMON_AUTH_URL,
    method: 'POST',
    data,
  })

const M_COMMON = {
  MCommonNotices,
  MCommonSwipeBanner,
  MCommonUserInfo,
  MCommonSms,
  MCommonAuth,
}

export default M_COMMON
