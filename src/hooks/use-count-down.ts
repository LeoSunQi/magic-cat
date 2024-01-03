/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-10 16:04:04
 * @LastEditTime: 2023-12-29 13:10:34
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import { ref } from 'vue'
import { showNotify } from 'vant'
import { isMobile } from '@/utils/test'

export type TStatus = 'initial' | 'sending' | 'success' | 'fail'

export default function useCountDown(customSeconds = 60) {
  const verifyText = ref<string>('发送验证码')
  const seconds = ref(customSeconds ? customSeconds : 60)
  const timre = ref()
  const status = ref<TStatus>('initial')

  const initStatus = () => {
    verifyText.value = '发送验证码'
    seconds.value = customSeconds
    status.value = 'initial'
  }

  const setStatus = (val: TStatus) => (status.value = val)

  const beforeSend = async (phone: string | number, fn: () => void) => {
    if (!phone) {
      showNotify({ type: 'danger', message: '请输入手机号' })
      return
    }

    if (!isMobile(phone as string)) {
      return
    }

    await fn()

    if (status.value === 'success') {
      send()
      return
    }

    if (status.value === 'fail') {
      showNotify('短信发送失败, 请重新发生')
      return
    }
  }

  const send = () => {
    timre.value = setInterval(() => {
      if (seconds.value > 0) {
        verifyText.value = `${seconds.value} 秒后重发`
        status.value = 'sending'
        seconds.value--
      } else {
        clearInterval(timre.value)
        initStatus()
      }
    }, 1000)
  }

  return {
    status,
    setStatus,
    seconds,
    verifyText,
    send,
    beforeSend,
  }
}
