<template>
  <div class="page-bg">
    <div class="cat-container">
      <div class="cat-icon-container">
        <van-icon name="like" size="60" color="#ef4444" />
      </div>
      <div class="cat-cell">
        <div class="cat-cell_title">已选猫猫</div>
        <cat-card
          :url="info.bind_cat.image"
          :title-content="{
            title: info.bind_cat.catname,
            desc: info.bind_cat.catid,
          }"
          :desc="{
            level: info.bind_cat.level,
            minute: info.bind_cat.minute,
            status: info.bind_cat.status,
          }"
        />
      </div>
      <div class="cat-cell">
        <div class="cat-cell_title">我的猫猫</div>
        <cat-card
          :url="info.image"
          :title-content="{ title: info.catname, desc: info.catid }"
          :desc="{
            level: info.level,
            minute: info.minute,
            status: info.status,
          }"
        />
      </div>
    </div>
    <div class="cat-list">
      <div class="cat-list_title">繁育信息</div>
      <van-cell title="繁育价格" size="large">
        <template #value>
          <span class="cat-price">{{ info.price }}</span>
        </template>
      </van-cell>
      <van-cell title="繁育时长" size="large">
        <template #value>
          <span class="cat-time">{{ info.time * 24 }}</span>
        </template>
      </van-cell>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onActivated } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = ref(route.params.id)
const info = ref(JSON.parse(route.query.obj as string))

onActivated(() => {
  if (id.value !== route.params.id) {
    id.value = route.params.id
    info.value = JSON.parse(route.query.obj as string)
  }
})
</script>
<style scoped lang="scss">
.page-bg {
  width: 100%;
  min-height: 100vh;
  background: $l-gray-2;
  .cat-container {
    box-sizing: border-box;
    width: 100%;
    padding: $l-spacing-xl;
    display: grid;
    gap: $l-spacing-xl;
    grid-template-columns: repeat(2, 1fr);
    position: relative;
    .cat-icon-container {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 10;
      transform: translate(-50%, -50%);
    }
    .cat-cell {
      .cat-cell_title {
        padding: $l-spacing-xl 0;
      }
    }
  }
  .cat-list {
    box-sizing: border-box;
    padding: $l-spacing-xl;
    .cat-list_title {
      font-size: 18px;
      padding: 15px 0;
    }
    .cat-price {
      color: $l-red-5;
      &::after {
        content: ' 猫币';
        font-size: 80%;
      }
    }
    .cat-time {
      color: $l-red-5;
      &::after {
        content: ' 小时';
        font-size: 80%;
      }
    }
  }
}
</style>
