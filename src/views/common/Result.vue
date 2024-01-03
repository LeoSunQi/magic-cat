<template>
  <div class="result-container">
    <logo size="140" />
    <div class="r-desc">
      <div class="r-desc_title">{{ arr[type].title }}</div>
      <div class="r-desc-text">{{ arr[type].text }}</div>
      <div class="r-desc-text">{{ arr[type].desc }}</div>
    </div>
    <div class="r-btn">
      <van-button
        type="primary"
        block
        @click="$router.push(`${arr[type].path}`)"
        >{{ arr[type].btn_text }}</van-button
      >
    </div>
    <div class="r-back" @click="$router.push('/home')">返回集市</div>
  </div>
</template>
<script setup lang="ts">
import { Logo } from '@/components'
import { onActivated } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
let type: number = +route.params?.type

const arr = [
  {
    type: 0,
    title: '魔力购买成功',
    text: '您可以在我的猫窝中查看魔力详情',
    desc: '',
    path: '/profiles',
    btn_text: '进入我的猫窝',
  },
  {
    type: 1,
    title: '已开始繁育',
    text: '本次繁育需要24小时',
    desc: '您可以在育儿箱中查看繁育详情',
    path: '/pannier',
    btn_text: '查看育儿箱',
  },
]

onActivated(() => {
  if (type !== +route.params.type) {
    type = +route.params?.type
  }
})
</script>
<style scoped lang="scss">
.result-container {
  box-sizing: border-box;
  padding: 0 20px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: $l-gray-2;
  .r-desc {
    padding: 40px 0;
    font-size: 28px;
    .r-desc_title {
      margin-bottom: 10px;
    }
    .r-desc-text {
      font-size: 14px;
      color: $l-gray-4;
      padding: 2px;
    }
  }
  .r-btn {
    width: 100%;
    margin-bottom: 20px;
  }
  .r-back {
    color: $l-blue-5;
  }
}
</style>
