<template>
  <div>
    <div class="banner">
      <span class="b-title">邀请好友送猫币</span>
      <span class="b-text">每日满额后可获额外奖励哦</span>
      <logo alt="logo" size="100" />
    </div>
    <div class="container">
      <van-row :gutter="20" class="l-row">
        <van-col span="12" class="l-col">
          <div>邀请好友数量</div>
          <div class="lc-num">{{ user.invite_num }}</div>
        </van-col>
        <van-col span="12" class="l-col">
          <div>累计奖励猫币</div>
          <div class="lc-num">{{ user.total_currency }}</div>
        </van-col>
      </van-row>
      <van-button type="primary" block>立即邀请</van-button>
      <van-divider />
      <div class="l-content">
        <van-divider content-position="left" class="d-title"
          >活动规则文档</van-divider
        >
        <ul class="d-content">
          <li v-for="item in list" :key="item">{{ item }}</li>
        </ul>
        <van-divider content-position="left" class="d-title"
          >我的邀请记录</van-divider
        >
        <van-row v-for="l in records" :key="l.id" :gutter="20" class="lc-row">
          <van-col span="12" class="lcr-col">{{
            maskSensitiveInfo(l.phone)
          }}</van-col>
          <van-col span="12" class="lcr-col lcr-end">{{
            l.create_time
          }}</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Logo } from '@/components'
import { maskSensitiveInfo } from '@/utils'
import useAppStore from '@/store/use-app'
import apis from '@/api'

const store = useAppStore()
const user = computed(() => store.userinfo)
const records = ref()

const list = [
  '1. 每成功邀请1位好友可获得10个猫币的奖励；',
  '2. 好友领取魔力猫并完成注册后视为邀请成功；',
  '3. 好友领取魔力猫但未完成注册视为无效邀请；',
  '4. 邀请成功奖励猫币数量不设上限；',
  '5. 每日邀请好友达到10人后额外每人奖励5个猫币；',
  '6. 每日邀请好友数量不设上限；',
]

const getInvitationRecord = async () => {
  const { code, data } = await apis.MProfilesInvitationRecord({})
  if (+code === 0) {
    console.log('data :>> ', data)
    records.value = data.list
  }
}

onMounted(() => {
  getInvitationRecord()
})
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 260px;
  background-color: $l-slate-1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  .b-title {
    font-size: $l-fz-title-xl;
    font-weight: $l-fw-bold;
    color: $l-slate-7;
    margin-bottom: $l-spacing-md;
  }
  .b-text {
    font-size: $l-fz-text-md;
    color: $l-slate-7;
    margin-bottom: $l-spacing-lg;
  }
}
.l-row {
  padding: $l-spacing-lg 0;
  .l-col {
    text-align: center;
    .lc-num {
      padding: $l-spacing-lg 0;
      font-size: $l-fz-title-xl;
      color: $l-red-5;
      &::after {
        content: '个';
        font-size: 50%;
      }
    }
  }
}
.l-content {
  margin-top: $l-spacing-lg;
  .d-title {
    font-size: $l-fz-title-md;
    color: $l-gray-8;
    font-weight: $l-fw-bold;
  }
  .d-content {
    font-size: $l-fz-text-xl;
    box-sizing: border-box;
    padding: $l-spacing-md 0;
    color: $l-gray-5;
    line-height: $l-lh-md;
    li {
      margin-bottom: $l-spacing-md;
    }
  }
  .lc-row {
    padding: $l-spacing-md 0;
    color: $l-gray-5;
    font-size: $l-fz-text-xl;
    .lcr-end {
      text-align: end;
    }
  }
}
</style>
