<template>
  <div>
    <van-sticky>
      <div class="c-header">
        <div>可用猫币</div>
        <div class="ch-currency">{{ currency }}</div>
      </div>
      <div class="c-title-cell">收支明细</div>
    </van-sticky>
    <div class="basice-list">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh(onLoad(apis.MProfilesCatCurrency))"
      >
        <van-list
          v-model:loading="loading"
          v-model:error="error"
          :finished="finished"
          :finished-text="finishedText"
          error-text="请求失败，点击重新加载"
          @load="onLoad(apis.MProfilesCatCurrency)"
        >
          <ul class="bl-ul">
            <li v-for="l in list" :key="l.id" class="bl-ul_li">
              <div class="bl-ul_li-flex">
                <div>{{ typeContent(l) }}</div>
                <div>{{ l.create_time }}</div>
              </div>
              <div class="cat-unit" :style="currencyContent(l).style">
                {{ currencyContent(l).text }}
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatAmount } from '@/utils'
import { usePullRefresh } from '@/hooks'
import useAppStore from '@/store/use-app'
import apis from '@/api'

const store = useAppStore()
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
const currency = computed(() =>
  formatAmount(store.userinfo.currency, {
    style: 'decimal',
    currency: 'CNY',
    minimumFractionDigits: 2,
  }),
)

const currencyContent = computed(() => {
  return (item: Record<string, any>) => {
    let obj = { text: '0', style: { color: '#3b82f6' } }
    switch (item.status) {
      case 1:
        obj.text = `+${item.currency}`
        obj.style.color = '#3b82f6'
        break
      case 2:
        obj.text = `-${item.currency}`
        obj.style.color = '#ef4444'
        break
      default:
        break
    }
    return obj
  }
})
const typeContent = computed(() => {
  return (item: Record<string, any>) => {
    const arr = ['购买', '出售', '繁育', '邀请好友', '每日签到']
    let info = '购买支出'
    const statusText = item.status === 1 ? '收入' : '支出'
    switch (item.type) {
      case 1:
        info = `${arr[0]}${statusText}`
        break
      case 2:
        info = `${arr[1]}${statusText}`
        break
      case 3:
        info = `${arr[2]}${statusText}`
        break
      case 4:
        info = `${arr[3]}`
        break
      case 5:
        info = `${arr[4]}`
        break
      default:
        break
    }
    return info
  }
})
</script>

<style scoped lang="scss">
@import '@/styles/list.scss';
.c-header {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: $l-slate-1;
  color: $l-slate-7;
  .ch-currency {
    font-size: 30px;
    font-weight: $l-fw-bold;
    padding: $l-spacing-md 0;
  }
}
.c-title-cell {
  box-sizing: border-box;
  padding: 20px;
  background: $l-white;
  font-size: $l-fz-title-lg;
}
.d-title {
  font-size: $l-fz-title-lg;
  color: $l-slate-9;
}
.cat-unit::after {
  content: ' 猫币';
  font-size: 50%;
}
</style>
