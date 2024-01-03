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
        </van-cell-group>
        <div class="lf-btn">
          <van-button
            type="primary"
            :loading="loading"
            block
            native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
    <van-row :gutter="20" class="l-row">
      <van-col span="12" class="l-col">
        <span @click="$router.push('/register')">注册新用户</span>
      </van-col>
      <van-col span="12" class="l-col" @click="$router.push('/forget')">
        <span>找回密码</span>
      </van-col>
    </van-row>
    <div class="l-footer">
      <div class="lf-title">其他登录方式</div>
      <van-row :gutter="20" class="lf-row">
        <van-col span="8">
          <van-icon name="qq" size="34" color="#94a3b8" />
        </van-col>
        <van-col span="8">
          <van-icon name="wechat" size="34" color="#94a3b8" />
        </van-col>
        <van-col span="8">
          <van-icon name="weibo" size="34" color="#94a3b8" />
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Logo } from '@/components'
import { useLogin } from './composable'
import type { FieldType } from 'vant'
import useAppStore from '@/store/use-app'

const store = useAppStore()
const { loginRules, eyeIcon, types, loading, setLoading, resetPassType } =
  useLogin()

const form = reactive<{
  phone: string
  password: string
}>({
  phone: '',
  password: '',
})

const onSubmit = (values: object) => {
  setLoading(true)
  store.login(values)
  setTimeout(() => setLoading(false), 700)
}
</script>

<style scoped lang="scss">
@import '@/styles/login.scss';
</style>
