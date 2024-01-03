<template>
  <div class="bg">
    <div class="desc">
      <div class="d-msg">
        <van-icon name="warning" />
        绑定成功后可直接使用绑定的社交账号登录
      </div>
    </div>
    <van-cell-group inset>
      <van-cell title="微信" size="large">
        <template #value>
          <van-switch v-model="checkedWX" @change="onChange('wx')" />
        </template>
      </van-cell>
      <van-cell title="QQ" size="large">
        <template #value>
          <van-switch v-model="checkedQQ" @change="onChange('qq')" />
        </template>
      </van-cell>
      <van-cell title="微博" size="large">
        <template #value>
          <van-switch v-model="checkedWB" @change="onChange('wb')" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { showToast } from 'vant'
import { ref } from 'vue'

const checkedWX = ref(false)
const checkedQQ = ref(false)
const checkedWB = ref(false)

const onChange = (type: string) => {
  if (type === 'wx') {
    showToast('账号' + (checkedWX.value ? '绑定成功' : '已解除绑定'))
    return
  }

  if (type === 'qq') {
    showToast('账号' + (checkedQQ.value ? '绑定成功' : '已解除绑定'))
    return
  }

  if (type === 'wb') {
    showToast('账号' + (checkedWB.value ? '绑定成功' : '已解除绑定'))
    return
  }
}
</script>

<style scoped lang="scss">
.bg {
  width: 100%;
  height: 100vh;
  background: $l-gray-2;
  padding: $l-spacing-lg 0;
  .desc {
    box-sizing: border-box;
    padding: $l-spacing-xl;
    font-size: $l-fz-text-lg;
    .d-msg {
      padding: $l-spacing-lg;
      background: $l-amber-0;
      color: $l-amber-6;
      border-radius: $l-br-xl;
    }
  }
}
</style>
