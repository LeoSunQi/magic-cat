<template>
  <div class="page-bg">
    <div class="refresh-list">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh(onLoad(apis.MProfileMyCat))"
      >
        <van-list
          v-model:loading="loading"
          v-model:error="error"
          :finished="finished"
          :finished-text="finishedText"
          error-text="请求失败，点击重新加载"
          @load="onLoad(apis.MProfileMyCat)"
        >
          <div class="grid-container">
            <cat-card
              v-for="l in list"
              :key="l.id"
              :tags="{ text: l.tag }"
              :offset="[10, 10]"
              :url="l.image"
              :title-content="{ title: l.catname, desc: l.catid }"
              :content="{ text: l.price, suffix: '猫币' }"
              :desc="{ level: l.level, minute: l.minute, status: l.status }"
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
    path: `/cat-details/${val.id}/2`,
    query: { obj },
  })
}
</script>

<style scoped lang="scss">
.page-bg {
  width: 100%;
  min-height: 100vh;
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
