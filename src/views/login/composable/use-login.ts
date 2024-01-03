/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-29 15:47:59
 * @LastEditTime: 2023-12-30 13:09:58
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import { isMobile } from '@/utils/test'
import { ref } from 'vue'
export default function useLogin() {
  const eyeIcon = ref('closed-eye')
  const types = ref('password')
  const loading = ref(false)
  const setLoading = (val: boolean) => (loading.value = val)

  const resetPassType = () => {
    eyeIcon.value = eyeIcon.value === 'closed-eye' ? 'eye-o' : 'closed-eye'
    types.value = eyeIcon.value === 'closed-eye' ? 'password' : 'text'
  }

  const validatorMobile = (val: string) => {
    if (!isMobile(val)) {
      return '手机号格式不正确'
    }
    return ''
  }

  const loginRules = {
    phone: [
      {
        validator: validatorMobile,
        required: true,
        message: '请填写手机号码',
      },
    ],
    code: [{ required: true, message: '请填写验证码' }],
    password: [{ required: true, message: '请填写密码' }],
  }

  return {
    eyeIcon,
    types,
    resetPassType,
    loading,
    setLoading,
    loginRules,
  }
}
