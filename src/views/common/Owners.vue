<template>
  <div class="page-bg">
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
  </div>
</template>
<script setup lang="ts">
import { ref, onActivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = ref(route.params?.id)
const list = ref<Record<string, any>[]>(
  JSON.parse(route.query?.list as string) ?? [],
)

const toCatDefails = (val: Record<string, any>) => {
  const obj = JSON.stringify(val)
  router.push({
    path: `/cat-details/${val.id}/3`,
    query: { obj },
  })
}

onActivated(() => {
  if (id.value !== route.params?.id) {
    id.value = route.params?.id as string
    list.value = JSON.parse(route.query?.list as string) ?? []
  }
})
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
