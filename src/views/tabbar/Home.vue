<template>
  <div class="page-bg">
    <div class="banner-container">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="b in banners" :key="b.id">
          <van-image :src="b.url" class="base-image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-sticky>
      <div class="dropdown-menu">
        <van-dropdown-menu>
          <van-dropdown-item title="集市广场" disabled />
          <van-dropdown-item
            v-model="defaultVal"
            :options="defaultOptions"
            @change="onRefresh(onLoad(apis.MMackList))"
          />
        </van-dropdown-menu>
      </div>
    </van-sticky>
    <div class="refresh-list">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh(onLoad(apis.MMackList))"
      >
        <van-list
          v-model:loading="loading"
          v-model:error="error"
          :finished="finished"
          :finished-text="finishedText"
          error-text="请求失败，点击重新加载"
          @load="onLoad(apis.MMackList)"
        >
          <div class="list-item">
            <div class="cat-container">
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
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup lang="ts">
import apis from '@/api'
import { onMounted, ref } from 'vue'
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
const banners = ref()
const defaultVal = ref(0)
const defaultOptions = [
  { text: '默认排序', value: 0 },
  { text: '价格从低到高', value: 1 },
  { text: '价格从高到低', value: 2 },
  { text: '稀有度', value: 3 },
]

const toCatDefails = (val: Record<string, any>) => {
  const obj = JSON.stringify(val)
  router.push({
    path: `/cat-details/${val.id}/0`,
    query: { obj },
  })
}

const getBanners = async () => {
  const { code, data } = await apis.MCommonSwipeBanner()
  if (+code === 0) {
    banners.value = data
  }
}
onMounted(() => {
  getBanners()
})
</script>

<style scoped lang="scss">
.page-bg {
  width: 100%;
  min-height: 100%;
  background: $l-gray-2;
}
.banner-container {
  min-height: 200px;
}
.refresh-list {
  padding-bottom: 60px;
}

.cat-container {
  box-sizing: border-box;
  width: 100%;
  padding: $l-spacing-xl;
  display: grid;
  gap: $l-spacing-xl;
  grid-template-columns: repeat(2, 1fr);
}
</style>
