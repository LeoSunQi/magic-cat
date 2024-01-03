/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-30 20:52:31
 * @LastEditTime: 2024-01-02 20:23:41
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import Mock from 'mockjs'
import { BASICE_CATS, BASICS_USER, CAT_INFO, COMMON } from './common-data'

export const ProfileOrder = Mock.mock({
  'list|10-40': [
    {
      ...COMMON,
      order_type: '@integer(1, 4)', // 购买支出，出售收入，繁育支出，繁育收入
      order_no: '@id',
      cat_info: CAT_INFO,
      service_amout: '@integer(1, 100)',
      amount: function () {
        return this.cat_info.price
      },
      settle_amout: function () {
        return this.amount + this.service_amout
      },
    },
  ],
})

export const ProfilePannier = Mock.mock({
  'list|10-20': [
    {
      ...COMMON,
      ...BASICE_CATS,
      bind_cat: BASICE_CATS,
      currency: '@integer(10, 10000)',
      time: '@integer(1, 7)',
    },
  ],
})

export const ProfileMyCat = Mock.mock({
  'list|10-20': [
    {
      ...COMMON,
      ...CAT_INFO,
    },
  ],
})

export const ProfilesCatCurrency = Mock.mock({
  'list|5-20': [
    {
      ...COMMON,
      type: '@integer(1, 5)',
      status: '@integer(1, 2)',
      currency: '@integer(10, 10000)',
    },
  ],
})

export const ProfilesInvitationRecord = Mock.mock({
  'list|1-10': [
    {
      ...COMMON,
      ...BASICS_USER,
    },
  ],
})
