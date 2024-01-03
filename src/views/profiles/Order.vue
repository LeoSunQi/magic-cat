<template>
  <div class="page-bg">
    <van-tabs v-model:active="active" sticky animated>
      <van-tab v-for="t in tabs" :key="t.id" :title="t.title">
        <van-pull-refresh
          v-model="refreshing"
          @refresh="onRefresh(onLoad(apis.MProfileOrder))"
        >
          <van-list
            v-model:loading="loading"
            v-model:error="error"
            :finished="finished"
            :finished-text="finishedText"
            error-text="请求失败，点击重新加载"
            @load="onLoad(apis.MProfileOrder)"
          >
            <div class="container">
              <ul class="list-ul">
                <li
                  v-for="l in filterList"
                  :key="l.id"
                  class="li-item"
                  @click="toOrderDetails(l)"
                >
                  <div class="li-item-gird">
                    <div class="item-image">
                      <img :src="l.cat_info.image" alt="" class="base-image" />
                    </div>
                    <div class="item-content">
                      <div class="item-content_title">
                        <span>{{ l.cat_info.catname }}</span>
                        <span>{{ l.cat_info.catid }}</span>
                      </div>
                      <span class="item-content_desc">{{ l.create_time }}</span>
                    </div>
                    <div class="item-content_info">
                      <van-tag plain>{{
                        orderTypeContent(l.order_type).text
                      }}</van-tag>
                      <div
                        :class="[
                          'item-content_price',
                          orderTypeContent(l.order_type).className,
                        ]"
                      >
                        {{ l.settle_amout }}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import apis from '@/api'
import { ref, computed } from 'vue'
import { usePullRefresh } from '@/hooks'
import { useRouter } from 'vue-router'
import { useOrder } from './composable'

const router = useRouter()
const { orderTypeContent } = useOrder()
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
const active = ref(0)
const tabs = ref([
  { id: 0, title: '全部' },
  { id: 1, title: '购买支出' },
  { id: 2, title: '出售收入' },
  { id: 3, title: '繁育支出' },
  { id: 4, title: '繁育收入' },
])

const filterList = computed(() => {
  if (active.value === 0) {
    return list.value
  }
  return list.value.filter((item) => +item.order_type === active.value)
})

const toOrderDetails = (info: Record<string, any>) => {
  const obj = JSON.stringify(info)
  router.push({
    path: `/order-details/${info.id}`,
    query: { obj },
  })
}
</script>

<style scoped lang="scss">
.page-bg {
  width: 100%;
  min-height: 100vh;
  background: $l-gray-2;
  .list-ul {
    .li-item {
      box-sizing: border-box;
      background: $l-white;
      padding: 10px;
      margin-bottom: 20px;
      border-radius: $l-br-md;
      .li-item-gird {
        display: grid;
        grid-template-columns: 1fr 2.5fr 1.5fr;
        gap: 6px;
        align-items: center;
        .item-image {
          width: 70px;
          height: 70px;
        }
        .item-content {
          line-height: 1.7;
          font-size: $l-fz-text-xl;
          word-break: break-all;
          .item-content_title {
            span {
              margin-right: 4px;
            }
          }
          .item-content_desc {
            color: $l-gray-5;
            font-size: $l-fz-text-md;
            margin-top: 10px;
          }
        }
        .item-content_info {
          text-align: end;
          .item-content_price {
            margin-top: 10px;
          }
          .push-price {
            color: $l-blue-5;
          }
          .minus-price {
            color: $l-red-5;
          }
          .push-price::before {
            content: '+';
            margin-right: 4px;
          }
          .minus-price::before {
            content: '-';
            margin-right: 4px;
          }
          .push-price,
          .minus-price {
            font-weight: 600;
            &::after {
              content: '猫币';
              margin-left: 4px;
              font-size: 80%;
            }
          }
        }
      }
    }
  }
}
</style>
