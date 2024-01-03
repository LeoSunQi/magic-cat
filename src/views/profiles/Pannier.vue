<template>
  <div class="page-bg">
    <div class="refresh-list">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh(onLoad(apis.MProfilePannier))"
      >
        <van-list
          v-model:loading="loading"
          v-model:error="error"
          :finished="finished"
          :finished-text="finishedText"
          error-text="请求失败，点击重新加载"
          @load="onLoad(apis.MProfilePannier)"
        >
          <div class="grid-container">
            <cat-card
              v-for="l in list"
              :key="l.id"
              :tags="{ text: l.tag }"
              :offset="[10, 10]"
              :url="l.image"
              :title-content="{ title: l.catname, desc: l.catid }"
              :content="{ text: l.time, prefix: '剩余：', suffix: '天' }"
              @on-click="toCatDefails(l)"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup lang="ts">
import apis from '@/api'
import { useRouter } from 'vue-router'
import { usePullRefresh } from '@/hooks'
import { CatCard } from '@/components'

const router = useRouter()
const {
  onRefresh,
  onLoad,
  loading,
  error,
  finished,
  finishedText,
  refreshing,
  list,
} = usePullRefresh()

const toCatDefails = (val: Record<string, any>) => {
  const obj = JSON.stringify(val)
  router.push({
    path: `/pannier-details/${val.id}`,
    query: { obj },
  })
}
</script>

<style scoped lang="scss">
.page-bg {
  background: $l-gray-2;
  .grid-container {
    box-sizing: border-box;
    width: 100%;
    padding: $l-spacing-xl;
    display: grid;
    gap: $l-spacing-xl;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

