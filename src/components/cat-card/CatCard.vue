<template>
  <div class="cat-card" :style="catCardStyle" @click="emit('onClick', $event)">
    <div v-show="tags.text" class="cat-card-tag" :style="catCardTagStyle">
      {{ tags.text }}
    </div>
    <div class="cat-image">
      <img :src="url" alt="Magic Cat" :width="imgSize" :height="imgSize" />
    </div>
    <div class="cat-content">
      <div v-show="Object.keys(titleContent).length > 0" class="cat-cell">
        <span class="cat-title">{{ titleContent.title }}</span>
        <span class="cat-desc">{{ titleContent.desc }}</span>
      </div>
      <div
        v-show="Object.keys(content).length > 0"
        class="cat-cell cat-cell-content"
        :style="contentStyle"
      >
        <span class="cat-content_prefix">{{ content.prefix }}</span>
        <span class="cat-price">{{ content.text }}</span>
        <span class="cat-content_suffix">{{ content.suffix }}</span>
      </div>
      <div v-show="Object.keys(desc).length > 0" class="cat-cell-tags">
        <span class="cat-tag">第{{ desc.level }}代</span>
        <span class="cat-tag">{{ desc.minute }}分钟</span>
        <span class="cat-tag">{{ statusText(desc.status) }}</span>
      </div>
      <slot name="content" />
    </div>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { type StyleValue, computed } from 'vue'
import type { carCardProps } from '.'
import loginImage from '@/assets/logo.svg'

const props = withDefaults(defineProps<carCardProps>(), {
  tags: () => ({}),
  offset: () => [0, 0],
  url: loginImage,
  imgSize: '100%',
  titleContent: () => ({}),
  content: () => ({}),
  desc: () => ({}),
  cardStyle: () => ({}),
  cardTagStyle: () => ({}),
  contentStyle: () => ({}),
})

const emit = defineEmits<{
  (e: 'onClick', event?: MouseEvent): void
}>()

const catCardTagStyle = computed(() => {
  let style: StyleValue = {
    background: 'rgba(0, 0, 0, 0.1)',
    color: '#fff',
    borderRadius: '4px',
  }

  if (Object.keys(props.cardTagStyle).length > 0) {
    style = Object.assign(style, props.cardTagStyle)
  }

  style.top = `${props.offset[0]}px`

  if (props.tags.align === 'left') {
    style.left = `${props.offset[1]}px`
    style.right = 'auto'
  }

  if (props.tags.align === 'right' || !props.tags.align) {
    style.top = `${props.offset[0]}px`
    style.right = `${props.offset[1]}px`
    style.left = 'auto'
  }

  return style
})

const statusText = computed(() => {
  return (status?: number | string) => {
    return status === 1 ? '正常' : status === 2 ? '休息' : '待繁育'
  }
})

const catCardStyle = computed(() => {
  let style: StyleValue = {
    backgroundColor: '#fff',
    borderRadius: '10px',
  }

  if (Object.keys(props.cardStyle).length > 0) {
    style = Object.assign(style, props.cardStyle)
  }

  return style
})
</script>
<style scoped lang="scss">
.cat-card {
  box-sizing: border-box;
  width: 100%;
  word-break: break-all;
  overflow: hidden;
  position: relative;
  .cat-card-tag {
    box-sizing: border-box;
    position: absolute;
    min-width: 30%;
    text-align: center;
    padding: 2px;
    font-size: 14px;
  }
  .cat-image {
    min-height: 170px;
    width: 100%;
    height: 150px;
    background: $l-slate-1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .cat-content {
    min-height: 50px;
    padding: 10px;
    line-height: 1.6;
    .cat-cell {
      .cat-title {
        font-size: $l-fz-text-xl;
      }
      .cat-desc {
        font-size: $l-fz-text-lg;
        padding: 0 $l-spacing-xxs;
      }
    }
    .cat-cell-content {
      font-size: $l-fz-text-xl;
      color: $l-red-5;
      font-weight: $l-fw-bold;
      .cat-content_suffix {
        margin-left: 2px;
        font-size: 80%;
      }
    }

    .cat-cell-tags {
      margin-top: 4px;
      box-sizing: border-box;
      width: 100%;
      display: grid;
      gap: $l-spacing-xxs;
      grid-template-columns: repeat(3, 1fr);
      .cat-tag {
        border: $l-border-solid $l-gray-3;
        text-align: center;
        font-size: $l-fz-text-sm;
        color: $l-stone-5;
      }
    }
  }
}
</style>
