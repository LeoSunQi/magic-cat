/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-30 07:45:28
 * @LastEditTime: 2023-12-30 14:33:09
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */

/**
 * 数字金额格式过滤 10000 => "￥10,000.00" | $1,234.56 | 1,234.57 | 75.00% | 12K
 * @param amount
 * 参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 * @param options 配置各种格式
 * @param locale locale：用于格式化数字的语言环境; zh-CN | en-US | ...
 * @returns
 */
export const formatAmount = (
  amount: number,
  options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
  },
  locale: string = 'zh-CN',
) => {
  return new Intl.NumberFormat(locale, options).format(amount)
}

/**
 * 信息脱敏处理
 * @param val
 * @param start
 * @returns
 */
export const maskSensitiveInfo = (info: string, start: number = 3): string => {
  const end = info.length - 4
  let placeholder = '*'
  if (info?.length) {
    placeholder = placeholder.repeat(info.length - 8)
  }
  const first = info.slice(0, start)
  const last = info.slice(end)
  return `${first}${placeholder}${last}`
}

export const isArray = <T>(arr: T): boolean => {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

/**
 * 深度克隆
 * @param obj
 * @returns
 */
export const deepClone = <T extends number | boolean | undefined>(
  obj: T,
): T | Record<string, any> => {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    //原始类型直接返回
    return obj
  }
  const o: Record<string, any> = isArray(obj) ? [] : {}
  for (const i in obj as unknown as object) {
    if ((obj as object).hasOwnProperty(i)) {
      o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  }
  return o
}

// function throttle(
//   func: (...args: any[]) => any,
//   delay: number,
// ): (...args: any[]) => void {
//   let timeout: number | null = null

//   return function (...args: any[]): void {
//     const context = this

//     const later = function () {
//       timeout = null
//       func.apply(context, args)
//     }

//     clearTimeout(timeout)
//     timeout = setTimeout(later, delay)
//   }
// }

// function debounce(
//   func: (...args: any[]) => any,
//   delay: number,
// ): (...args: any[]) => void {
//   let timeout: number | null = null

//   return function (...args: any[]): void {
//     const context = this

//     const later = function () {
//       timeout = null
//       func.apply(context, args)
//     }

//     clearTimeout(timeout)
//     timeout = setTimeout(later, delay)
//   }
// }
