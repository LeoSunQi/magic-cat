/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-30 21:10:32
 * @LastEditTime: 2023-12-31 12:37:28
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import {
  PROFILES_CAT_CURRENCY_URL,
  PROFILES_INVITATION_RECORD_URL,
  PROFILE_MY_CAT_URL,
  PROFILE_ORDER_URL,
  PROFILE_PANNIER_URL,
} from '@/constants/api-constant'
import type { Recordable, ResponseEntity } from '@/typings'
import request from '@/utils/request'

const MProfileOrder = (data?: Recordable): Promise<ResponseEntity> =>
  request({
    url: PROFILE_ORDER_URL,
    method: 'POST',
    data,
  })

const MProfilePannier = (data?: Recordable): Promise<ResponseEntity> =>
  request({
    url: PROFILE_PANNIER_URL,
    method: 'POST',
    data,
  })

const MProfileMyCat = (data?: Recordable): Promise<ResponseEntity> =>
  request({
    url: PROFILE_MY_CAT_URL,
    method: 'POST',
    data,
  })

const MProfilesCatCurrency = (data?: Recordable): Promise<ResponseEntity> =>
  request({
    url: PROFILES_CAT_CURRENCY_URL,
    method: 'POST',
    data,
  })

const MProfilesInvitationRecord = (
  data?: Recordable,
): Promise<ResponseEntity> =>
  request({
    url: PROFILES_INVITATION_RECORD_URL,
    method: 'POST',
    data,
  })

const M_PROFILES = {
  MProfileOrder,
  MProfilePannier,
  MProfileMyCat,
  MProfilesCatCurrency,
  MProfilesInvitationRecord,
}

export default M_PROFILES
