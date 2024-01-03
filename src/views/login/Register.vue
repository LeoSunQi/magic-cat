<template>
  <div class="login">
    <div class="l-header">
      <logo alt="logo" size="100" />
      <div class="logo-name">魔力</div>
    </div>
    <div class="l-form">
      <van-form required="auto" @submit="onSubmit">
        <van-cell-group>
          <van-field
            v-model="form.phone"
            name="phone"
            left-icon="phone"
            placeholder="请输入手机号码"
            size="large"
            clearable
            :rules="loginRules.phone"
          />
          <van-field
            v-model="form.code"
            left-icon="comment"
            type="number"
            name="code"
            placeholder="请输入短信验证码"
            size="large"
            clearable
            :rules="loginRules.code"
          >
            <template #button>
              <van-button
                size="small"
                type="primary"
                :disabled="disabled"
                plain
                @click="beforeSend(form.phone, getVerificationCode)"
                >{{ verifyText }}</van-button
              >
            </template>
          </van-field>
          <van-field
            v-model="form.password"
            :type="types as FieldType"
            name="password"
            left-icon="lock"
            size="large"
            placeholder="请输入密码"
            clearable
            :rules="loginRules.password"
            :right-icon="eyeIcon"
            @click-right-icon="resetPassType"
          />
          <van-checkbox v-model="checked" class="check-box">
            同意<a @click="$router.push('/agreement')">《用户服务协议》</a>
          </van-checkbox>
        </van-cell-group>
        <div class="lf-btn">
          <van-button
            type="primary"
            :loading="loading"
            block
            native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
    <div class="l-row l-col">
      <div class="l-col">
        <span @click="$router.push('/login')">已有账户，立即登录</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Logo } from '@/components'
import { useCountDown } from '@/hooks'
import { useLogin } from './composable'
import { showNotify, type FieldType } from 'vant'
import api from '@/api'

const router = useRouter()
const { loginRules, eyeIcon, types, loading, resetPassType, setLoading } =
  useLogin()
const { verifyText, status, beforeSend, setStatus } = useCountDown()

const disabled = computed(() => {
  return status.value === 'initial' ? false : true
})

const form = reactive<{
  phone: string
  password: string
  code: string
}>({
  phone: '',
  password: '',
  code: '',
})

const checked = ref(false)

const onSubmit = () => {
  setLoading(true)
  if (!checked.value) {
    showNotify({ type: 'warning', message: '请先阅读并同意用户协议' })
    setLoading(false)
    return
  }

  setTimeout(() => {
    showNotify({ type: 'primary', message: '注册成功' })
    router.push('/login')
    setLoading(false)
  }, 700)
}

const getVerificationCode = async () => {
  const { code, data } = await api.MCommonSms({ phone: form.phone })

  if (+code === 0) {
    showNotify({ type: 'primary', message: `验证码:${data.code}` })
    setStatus('success')
    return
  }

  setStatus('fail')
}
</script>

<style scoped lang="scss">
@import '@/styles/login.scss';
</style>
