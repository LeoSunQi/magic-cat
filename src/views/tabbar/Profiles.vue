<template>
  <div class="profiles">
    <div class="user-container">
      <van-row :gutter="20" class="user-row">
        <van-col span="7" @click="$router.push('/settings')">
          <div class="basice-avatar">
            <van-image :src="user?.avatar" class="base-image" />
          </div>
        </van-col>
        <van-col span="13" @click="$router.push('/settings')">
          <div class="user-name">
            {{ user?.user_name }}
            <span>{{ store.sex }}</span>
          </div>
          <div class="user-desc">{{ store.phone }}</div>
        </van-col>
        <van-col span="4" @click="$router.push('/notices')">
          <van-badge :content="5">
            <van-icon name="bell" size="24" color="#6b7280" />
          </van-badge>
        </van-col>
      </van-row>
    </div>
    <div class="radian" />
    <div class="">
      <van-cell-group inset>
        <van-cell
          v-for="c in cells"
          :key="c.id"
          :title="c.title"
          :to="c.to"
          size="large"
          is-link
        >
          <template #value>
            <span :class="valueClass(c.id)" @click="handelSignIn(c)">{{
              formatValue(c)
            }}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <van-divider />
    <div class="logout">
      <van-button type="primary" block plain @click="store.logout"
        >退出登录</van-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import useAppStore from '@/store/use-app'
import { formatAmount } from '@/utils'
import { showToast } from 'vant'

const store = useAppStore()
const user = computed(() => store.userinfo)

const cells = ref([
  { id: 0, title: '我的猫猫', value: '', to: '/my-cat' },
  { id: 1, title: '育儿箱', value: '', to: '/pannier' },
  { id: 2, title: '我的订单', value: '', to: '/order' },
  {
    id: 3,
    title: '我的猫币',
    value: store.userinfo?.currency || 0,
    to: '/cat-currency',
  },
  {
    id: 4,
    title: '每日签到',
    value: store.isSignIn ? '今日已领' : '签到领猫币',
    to: '',
  },
  { id: 5, title: '邀请好友', value: '邀请送猫币', to: '/invite' },
  { id: 6, title: '关于魔力', value: '', to: '/about' },
])

const formatValue = computed(() => {
  return (obj: Record<string, any>) => {
    return obj.id === 3
      ? formatAmount(obj.value, {
          style: 'decimal',
          currency: 'CNY',
          minimumFractionDigits: 2,
        })
      : obj.value
  }
})

const valueClass = computed(() => {
  return (id: number) => {
    return id === 3 ? 'c-price' : ''
  }
})

const handelSignIn = (obj: Record<string, any>) => {
  if (obj.id !== 4 || store.isSignIn) return
  store.getUserInfo()
  store.setSigIn(true)
  showToast('今日签到成功！获得10个猫币')
  obj.value = '今日已领'
}
</script>

<style scoped lang="scss">
.profiles {
  width: 100%;
  height: 100%;
  .user-container {
    box-sizing: border-box;
    width: 100%;
    padding: 40px $l-spacing-xxl 0 $l-spacing-xxl;
    background: $l-slate-1;
    .basice-avatar {
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      border-radius: 100%;
      overflow: hidden;
    }
    .user-row {
      display: flex;
      align-items: center;
      line-height: $l-lh-lg;
      .user-name {
        font-size: $l-fz-title-lg;
        span {
          margin-left: $l-spacing-xs;
          font-size: $l-fz-text-lg;
        }
      }
      .user-desc {
        font-size: $l-fz-text-lg;
        color: $l-text-color-tertiary;
      }
    }
  }
  .radian {
    width: 100%;
    height: 60px;
    background: $l-slate-1;
    border-radius: 0 0 100% 100%;
  }
  .logout {
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
  }
  .c-price {
    color: $l-red-5;
    font-weight: $l-fw-bold;
  }
}
</style>
