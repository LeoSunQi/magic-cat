<template>
  <div class="bg">
    <van-cell-group inset>
      <van-cell size="large" title="我的昵称" :value="user.nick_name" is-link />
      <van-cell size="large" title="手机号码" :value="store.phone" is-link />
      <van-cell
        size="large"
        title="登录密码"
        value="修改密码"
        is-link
        to="/forget"
      />
      <van-cell
        size="large"
        title="社交账号"
        value="修改绑定"
        is-link
        to="/bind-account"
      />
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useAppStore from '@/store/use-app'

const store = useAppStore()
const user = computed(() => store.userinfo)
</script>

<style scoped lang="scss">
.bg {
  width: 100%;
  height: 100vh;
  background: $l-gray-2;
  padding: $l-spacing-lg 0;
}
</style>
