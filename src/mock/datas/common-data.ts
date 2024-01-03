/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-29 10:15:52
 * @LastEditTime: 2024-01-02 21:50:04
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import Mock from 'mockjs'

export const COMMON = {
  id: '@id',
  create_time: '@datetime',
  update_time: '@now',
}

export const USER_TOKEN = '@string(64)'

export const SMS_CODE = '@integer(1000, 9999)'

export const BASICS_USER = {
  uid: '@id(6)',
  user_name: '@cname',
  avatar: '@image("200x200", "#3b82f6", "#fff", "avatar")',
  phone: '@phone',
  email: '@email',
  sex: '@integer(1, 3)',
  birthday: '@datetime("yyyy-MM-dd")',
  nick_name: '@cname',
}

export const USER_BAND_INFO = {
  wx_code: '@string(5, 10)',
  is_wx: '@boolean',
  qq_code: '@integer(100000, 1000000000)',
  is_qq: '@boolean',
  wb_code: '@string(5, 10)',
  is_wb: '@boolean',
}

export const USER_MORE = {
  currency: '@integer(10, 10000)',
  invite_num: '@integer(10, 10000)',
  total_currency: function () {
    return Number(this.invite_num) * 10
  },
}

export const USER_INFO = {
  ...BASICS_USER,
  ...USER_BAND_INFO,
  ...USER_MORE,
}

const BANNER_URL = Mock.mock(
  '@image("750x400", "#eff6ff", "#475569", "Magic Cat Banner")',
)

export const BASICE_CATS = {
  banner_url: BANNER_URL,
  image: '@image("200x200", "#eff6ff", "#475569", "Magic Cat Image")',
  catid: '@zip',
  catname: '@ctitle(2, 5)',
  price: '@integer(100, 10000)',
  status: '@integer(1, 3)', // 正常 | 休息 | 待繁育
  level: '@integer(1, 10)',
  minute: '@integer(1, 24)',
  'tag|1': ['传奇', '普通'],
}

export const CAT_PROPS_TYPE = [
  '体型',
  '眼睛',
  '嘴巴',
  '花纹',
  '身体色',
  '花纹色',
  '眼睛色',
  '肚皮色',
  '性别',
  '道具',
]

export const CAT_PROPS_TAG = ['普通', '稀有', '史诗', '传奇', '罕见', '卓越']

export const CAT_PROPS = {
  'type|+1': CAT_PROPS_TYPE,
  'desc|1': ['@cword(2,4)'],
  'tag|+1': CAT_PROPS_TAG,
}

export const OWNER_CAT_INFO = {
  ...BASICE_CATS,
  owner: {
    ...BASICS_USER,
    cat_num: 0,
    cats: [],
  },
  'props|10': [CAT_PROPS],
  'parents|2': [BASICE_CATS],
  'owners|1-6': [
    {
      ...BASICS_USER,
      create_time: '@datetime',
    },
  ],
}

export const CAT_INFO = {
  ...BASICE_CATS,
  owner: {
    ...BASICS_USER,
    cat_num: '@integer(1, 10)',
    cats: function () {
      return Array.from({ length: Number(this.cat_num) }, () => OWNER_CAT_INFO)
    },
  },
  'props|10': [CAT_PROPS],
  'parents|2': [BASICE_CATS],
  'owners|1-6': [
    {
      ...BASICS_USER,
      create_time: '@datetime',
    },
  ],
}

export const CommonNotices = Mock.mock({
  'list|10-40': [
    {
      ...COMMON,
      title: '@ctitle(10, 20)',
      is_read: '@boolean',
      order_info: {
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
    },
  ],
})

export const CommonBanner = Mock.mock({
  'swipe|2-4': [
    {
      ...COMMON,
      url: '@image("750x400", "#eff6ff", "#475569", "每日免费限时开放")',
    },
  ],
})

export const CommonUser = Mock.mock({ ...USER_INFO, ...COMMON })

export const CommonSms = Mock.mock({
  code: SMS_CODE,
})

export const CommonAuth = Mock.mock({
  token: USER_TOKEN,
  user_info: USER_INFO,
})
