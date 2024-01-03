<template>
  <div class="page-bg">
    <div class="n-list">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh(onLoad(apis.MCommonNotices))"
      >
        <van-list
          v-model:loading="loading"
          v-model:error="error"
          :finished="finished"
          :finished-text="finishedText"
          error-text="请求失败，点击重新加载"
          @load="onLoad(apis.MCommonNotices)"
        >
          <div v-for="n in list" :key="n.id" class="n-item">
            <div class="item-header item-grid-container">
              <div class="item-grid">
                <van-icon name="volume" />
                <span class="item-header-text">系统通知</span>
                <van-tag v-show="n.is_read" type="danger">new</van-tag>
              </div>
              <div class="item-grid item-end">
                <span class="item-desc">{{ n.create_time }}</span>
              </div>
            </div>
            <div class="item-content">{{ n.title }}</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup lang="ts">
import apis from '@/api'
import { usePullRefresh } from '@/hooks'

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
</script>

<style scoped lang="scss">
.page-bg {
  width: 100%;
  background: $l-gray-2;
  .n-list {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    .n-item {
      background: $l-white;
      margin-bottom: 15px;
      padding: $l-spacing-xxl;
      border-radius: $l-br-lg;
      .item-end {
        text-align: end;
      }
      .item-header {
        .item-header-text {
          margin: 0 6px;
        }
      }
      .item-grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        .item-grid {
          .item-desc {
            font-size: 12px;
            color: $l-gray-5;
          }
        }
      }
      .item-content {
        padding-top: 20px;
        color: $l-gray-5;
      }
    }
  }
}
</style>
