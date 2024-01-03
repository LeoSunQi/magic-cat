<template>
  <div class="logo" :style="logoStyle">
    <img :src="url" :alt="alt" />
  </div>
  <slot />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType, StyleValue } from 'vue'
import LogoImage from '@/assets/logo.svg'

type TUnit = 'px' | '%' | 'em' | 'rem'

const props = defineProps({
  /**
   * @description 图片地址
   */
  url: {
    type: String,
    required: true,
    default: LogoImage,
  },
  /**
   * @description 图片alt
   */
  alt: {
    type: String,
    default: 'logo',
  },
  /**
   * @description 图片大小
   */
  size: {
    type: [Number, String],
    default: 80,
  },
  /**
   * @description 是否圆角
   */
  round: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 图片大小单位
   * @constant 'px' | '%' | 'em' | 'rem
   */
  unit: {
    type: String as PropType<TUnit>,
    default: 'px',
  },
})

const logoStyle = computed(() => {
  const style: StyleValue = {}
  style.width = `${props.size}${props.unit}`
  style.height = `${props.size}${props.unit}`
  style.borderRadius = props.round
    ? (props.size as number) / 2 + props.unit
    : '4px'
  return style
})
</script>

<style scoped lang="scss">
.logo {
  vertical-align: middle;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
