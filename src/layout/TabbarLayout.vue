<template>
  <div class="layout-container">
    <div :style="tabbarStyle">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <van-tabbar
      ref="tabbarRef"
      v-model="store.defaultActivePath"
      active-color="#2563eb"
      inactive-color="#64748b"
      @change="onChange"
    >
      <van-tabbar-item
        v-for="item in list"
        :key="item.id"
        :name="item.url"
        :icon="item.icon"
        :to="item.url"
        >{{ item.name }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import type { StyleValue } from 'vue'
import useAppStore from '@/store/use-app'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useAppStore()
const tabbarRef = ref<Record<string, HTMLElement>>()
const tabbarHeight = ref(0)

const list = ref([
  { id: 0, name: '集市', icon: 'wap-home', url: '/home' },
  { id: 1, name: '繁育', icon: 'like', url: '/breed' },
  { id: 2, name: '我的', icon: 'user', url: '/profiles' },
])

const tabbarStyle = computed(() => {
  const style: StyleValue = {}
  if (tabbarHeight.value) {
    const height = `calc(100vh - ${tabbarHeight.value}px)`
    style.height = height
    style.maxHeight = height
    style.boxSizing = 'border-box'
  }
  return style
})

const onChange = (path: string) => {
  store.setActivePath(path)
}

onMounted(() => {
  tabbarHeight.value = tabbarRef.value?.$el.offsetHeight as number
})

watch(
  () => route.path,
  (newVal) => {
    if (store.defaultActivePath !== newVal) {
      store.setActivePath(newVal)
      return
    }
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
.layout-container {
  max-width: 750px;
}
</style>
