<template>
  <div class="page-bg">
    <div class="order-cell order-cell-pd">
      <div class="order-cell-title">猫猫信息</div>
      <div class="cat-info cat-info-grid">
        <div class="cat-info-image">
          <img :src="info.cat_info.image" alt="" />
        </div>
        <div class="cat-info_content">
          <div class="cat-info_content-title">{{ info.cat_info.catname }}</div>
          <div class="cat-info_content-desc">
            第{{ info.cat_info.level }}代 / {{ info.cat_info.tag }}
          </div>
        </div>
        <div
          class="cat-info_content-icons"
          @click="toCatDefails(info.cat_info)"
        >
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <div class="order-cell order-cell-pd">
      <div class="order-cell-title">订单信息</div>
    </div>
    <van-cell-group inset>
      <van-cell
        size="large"
        title="订单类型"
        :value="orderTypeContent(info.order_type).text"
      />
      <van-cell size="large" title="订单时间" :value="info.create_time" />
      <van-cell size="large" title="订单编号" :value="info.order_no" />
      <van-cell
        size="large"
        title="订单金额"
        :value="orderAmout(info.cat_info.price, 1)"
      />
      <van-cell
        size="large"
        title="手续费"
        :value="orderAmout(info.service_amout, 2)"
      />
      <van-cell
        size="large"
        title="结算金额"
        :value="orderAmout(info.settle_amout, 2)"
      />
    </van-cell-group>
  </div>
</template>
<script setup lang="ts">
import { ref, onActivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrder } from './composable'

const { orderTypeContent, orderAmout } = useOrder()
const route = useRoute()
const router = useRouter()
const id = ref(route.query?.id)
const info = ref(JSON.parse(route.query?.obj as string))

const toCatDefails = (val: Record<string, any>) => {
  const obj = JSON.stringify(val)
  router.push({
    path: `/cat-details/${val.id}/3`,
    query: { obj },
  })
}

onActivated(() => {
  if (id.value !== route.query?.id) {
    id.value = route.query?.id
    info.value = JSON.parse(route.query?.obj as string)
  }
})
</script>
<style scoped lang="scss">
.page-bg {
  width: 100%;
  min-height: 100vh;
  background: $l-gray-2;
  box-sizing: border-box;
  .order-cell-pd {
    padding: 0 18px;
  }
  .order-cell {
    box-sizing: border-box;
    .order-cell-title {
      padding: 20px 0;
      font-size: $l-fz-title-md;
    }
    .cat-info {
      box-sizing: border-box;
      padding: 10px;
      background: $l-white;
      border-radius: $l-br-md;
    }
    .cat-info-grid {
      display: grid;
      grid-template-columns: 1fr 2.5fr 0.5fr;
      gap: 10px;
      align-items: center;
      .cat-info-image {
        width: 80px;
        height: 80px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cat-info_content {
        line-height: 1.7;
        .cat-info_content-title {
          font-size: $l-fz-title-lg;
        }
        .cat-info_content-desc {
          font-size: $l-fz-text-md;
        }
        .cat-info_content-icons {
          text-align: right;
        }
      }
    }
  }
}
</style>
