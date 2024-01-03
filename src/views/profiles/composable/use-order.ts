/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2024-01-02 19:06:53
 * @LastEditTime: 2024-01-02 19:35:41
 * Copyright (c) 2024 by LeoSunQi, All Rights Reserved.
 */
import { computed } from 'vue'

export default function useOrder() {
  const orderAmout = computed(() => {
    return (amout: number, type: number) => {
      // type: 1: 订单金额， 2：结算金额/手续费
      let val = ''
      switch (type) {
        case 1:
          val = +amout > 0 ? `${amout} 猫币` : `暂无`
          break
        case 2:
          val = +amout > 0 ? `-${amout} 猫币` : `暂无`
          break
        default:
          break
      }
      return val
    }
  })

  const orderTypeContent = computed(() => {
    return (type: number) => {
      const obj = {
        text: '购买支出',
        className: 'push-price',
      }
      switch (type) {
        case 1:
          obj.text = '购买支出'
          obj.className = 'minus-price'
          break
        case 2:
          obj.text = '出售收入'
          obj.className = 'push-price'
          break
        case 3:
          obj.text = '繁育支出'
          obj.className = 'minus-price'
          break
        case 4:
          obj.text = '繁育收入'
          obj.className = 'push-price'
          break
        default:
          obj.text = '全部'
          obj.className = ''
          break
      }
      return obj
    }
  })

  return {
    orderAmout,
    orderTypeContent,
  }
}
