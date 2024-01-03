/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-29 19:38:07
 * @LastEditTime: 2024-01-02 18:09:02
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/bind-account',
    name: 'BindAccount',
    component: () => import('@/views/profiles/BindAccount.vue'),
    meta: { title: '绑定账号' },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/profiles/About.vue'),
    meta: { title: '关于魔力' },
  },
  {
    path: '/invite',
    name: 'Invite',
    component: () => import('@/views/profiles/Invite.vue'),
    meta: { title: '邀请好友' },
  },
  {
    path: '/cat-currency',
    name: 'CatCurrency',
    component: () => import('@/views/profiles/CatCurrency.vue'),
    meta: { title: '我的猫币' },
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/profiles/Order.vue'),
    meta: { title: '我的订单' },
  },
  {
    path: '/order-details/:id',
    name: 'OrderDetails',
    component: () => import('@/views/profiles/OrderDetails.vue'),
    meta: { title: '订单详情' },
  },
  {
    path: '/pannier',
    name: 'Pannier',
    component: () => import('@/views/profiles/Pannier.vue'),
    meta: { title: '育儿箱' },
  },
  {
    path: '/pannier-details/:id',
    name: 'PannierDetails',
    component: () => import('@/views/profiles/PannierDetails.vue'),
    meta: { title: '育儿箱详情' },
  },
  {
    path: '/my-cat',
    name: 'MyCat',
    component: () => import('@/views/profiles/MyCat.vue'),
    meta: { title: '我的猫猫' },
  },
  {
    // type 0: 购买, 1:繁育, 2: 我的猫猫
    path: '/cat-details/:id/:type',
    name: 'CatDetails',
    component: () => import('@/views/profiles/CatDetails.vue'),
    meta: { title: '猫猫详情' },
  },
  {
    path: '/band-cat/:id',
    name: 'BandCat',
    component: () => import('@/views/profiles/BandCat.vue'),
    meta: { title: '绑定猫猫' },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/profiles/Settings.vue'),
    meta: { title: '设置' },
  },
  {
    path: '/notices',
    name: 'Notices',
    component: () => import('@/views/profiles/Notices.vue'),
    meta: { title: '通知' },
  },
] as RouteRecordRaw[]
