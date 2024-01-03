/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-10 18:15:28
 * @LastEditTime: 2023-12-28 21:48:41
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
const mobile = /^(?:(?:\+|00)86)?1\d{10}$/

export const isMobile = (value: string) => mobile.test(value)
