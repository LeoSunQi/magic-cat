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
            type="password"
            name="password"
            left-icon="lock"
            size="large"
            placeholder="请输入密码"
            clearable
            :rules="loginRules.password"
          />
          <van-field
            v-model="form.newPassword"
            type="password"
            name="newPassword"
            left-icon="lock"
            size="large"
            placeholder="请再次输入密码"
            clearable
            :rules="loginRules.password"
          />
        </van-cell-group>
        <div class="lf-btn">
          <van-button
            type="primary"
            :loading="loading"
            block
            native-type="submit"
            >重置密码</van-button
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
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Logo } from '@/components'
import { useCountDown } from '@/hooks'
import { useLogin } from './composable'
import { showNotify } from 'vant'
import api from '@/api'
import useAppStore from '@/store/use-app'

const store = useAppStore()
const router = useRouter()
const { loginRules, loading, setLoading } = useLogin()
const { verifyText, status, beforeSend, setStatus } = useCountDown()

const disabled = computed(() => {
  return status.value === 'initial' ? false : true
})

const form = reactive<{
  phone: string
  password: string
  newPassword: string
  code: string
}>({
  phone: '',
  password: '',
  newPassword: '',
  code: '',
})

const onSubmit = () => {
  setLoading(true)
  setTimeout(() => {
    store.removeAllSession()
    showNotify({ type: 'success', message: '重置成功' })
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
