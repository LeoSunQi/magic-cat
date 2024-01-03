<template>
  <div class="details">
    <div class="d-container">
      <div class="d-header">
        <div class="d-header_img">
          <img :src="info.banner_url" alt="MagicCatBanner" class="base-image" />
        </div>
        <div class="d-warning" @click="show = true">
          <van-icon name="warning" />
          <span>休息说明</span>
        </div>
        <div class="d-title_container">
          <div class="d-grid-2">
            <div class="d-title">
              <span>{{ info.catname }}</span>
              <span>{{ info.catid }}</span>
              <van-tag>{{ info.tag }}</van-tag>
            </div>
            <div class="d-price">{{ info.price }}</div>
          </div>
          <div v-show="!info.level" class="d-grid-2 d-grid-tags">
            <span>第{{ info.level }}代</span>
            <span>{{ info.minute }}分钟</span>
            <span>{{ statusText(info.status) }}</span>
          </div>
        </div>
      </div>
      <div class="d-cell">
        <div class="d-cell-title">TA的属性</div>
        <div class="d-cell-content d-cell_grid-2">
          <div
            v-for="(l, i) in info.props"
            :key="i"
            class="d-cell_content-item d-cell_item-pd"
          >
            <span>{{ l.type }}：</span>
            <span>{{ l.desc }}</span>
            <div class="d-cell_tag">
              <van-tag>{{ l.tag }}</van-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="d-cell">
        <div class="d-cell-title">TA的父母</div>
        <div class="d-cell-content d-cell_grid-2">
          <div
            v-for="p in info.parents"
            :key="p.catid"
            class="d-cell_content-item"
          >
            <cat-card
              :tags="{ text: p.tag }"
              :offset="[10, 10]"
              :url="p.image"
              :title-content="{ title: p.catname, desc: p.catid }"
              :content="{ text: p.price, suffix: '猫币' }"
              :desc="{ level: p.level, minute: p.minute, status: p.status }"
            />
          </div>
        </div>
      </div>
      <div class="d-cell">
        <div class="d-cell-title">当前主人</div>
        <van-cell :title="info.owner.user_name" is-link>
          <template #value>
            <span @click="toOwners(info.owner.uid, info.owner.cats)"
              >共有 <i>{{ info.owner.cat_num }}</i> 只魔力猫</span
            >
          </template>
        </van-cell>
      </div>
      <div class="d-cell">
        <div class="d-cell-title">曾经的主人</div>
        <van-cell
          v-for="o in info.owners"
          :key="o.id"
          :title="o.user_name"
          :value="o.create_time"
        />
      </div>
    </div>
    <div class="d-footer">
      <van-button
        v-show="+type === 0"
        type="primary"
        block
        @click="onBuy(info.price)"
        >立即购买</van-button
      >
      <van-button v-show="+type === 1" type="primary" block @click="toBindCat"
        >选 TA 繁育</van-button
      >
      <div v-show="+type === 2" class="grid-btns">
        <van-button type="primary" block plain>挂出繁育</van-button>
        <van-button type="primary">卖出</van-button>
      </div>
    </div>
    <van-popup v-model:show="show" position="bottom" closeable>
      <div class="popup-container">
        <div class="popup-title">休息时间说明</div>
        <div class="popup-content">
          <ul class="popup-content_ul">
            <li v-for="d in desc" :key="d.title" class="popup-content_ul-li">
              <div class="popup-content_ul-li-title">{{ d.title }}</div>
              <ul v-for="l in d.list" :key="l" class="popup-content_ul-li-desc">
                <li>{{ l }}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script setup lang="ts">
import { onActivated, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAppStore from '@/store/use-app'
import { CatCard } from '@/components'
import { showConfirmDialog, showToast } from 'vant'

const route = useRoute()
const router = useRouter()
const store = useAppStore()
const id = ref(route.params?.id)
const type = ref(route.params?.type) // 0: home, 1: breed, 2: my-cat
const info = ref<Record<string, any>>(
  JSON.parse(route.query.obj as string) ?? {},
)
const show = ref(false)
const desc = [
  {
    title:
      '休息时间是指猫猫繁育后需要休息的时间。休息中的猫猫不可进行繁育，但可以买卖。繁育次数越多，休息时间会越长。以0代猫猫为例：',
    list: [
      '• 第1次-繁育后需休息1天',
      '• 第2次-繁育后需休息2天',
      '• 第3次-繁育后需休息4天',
      '• 第4次-繁育后需休息6天',
    ],
  },
  {
    title:
      '休息时间为0分钟表示猫猫未曾繁育，可以马上繁育。猫猫代数越大，休息的时间会越长。以1代猫为例：',
    list: [
      '• 第1次-繁育后需休息2天',
      '• 第2次-繁育后需休息4天',
      '• 第3次-繁育后需休息6天',
      '• 第4次-繁育后需休息8天',
    ],
  },
]

const statusText = computed(() => {
  return (status: number) => {
    return status === 1 ? '正常' : status === 2 ? '休息' : '待繁育'
  }
})

const toOwners = (id: number | string, arr: Record<string, any>[]) => {
  if (arr.length === 0) return
  const list = JSON.stringify(arr)
  router.push({
    path: `/owners/${id}`,
    query: { list },
  })
}

const toBindCat = () => {
  router.push({
    path: `/band-cat/${info.value.id}`,
    query: { obj: JSON.stringify(info.value) },
  })
}

const onBuy = (price: number) => {
  showConfirmDialog({
    title: '是否确认购买',
    message: `花费 ${price} 猫币购买`,
  })
    .then(() => {
      if (store.userinfo.currency < price) {
        showToast('购买失败，您的猫币不足')
        return
      }
      router.push('/result/0')
    })
    .catch(() => {})
}

onActivated(() => {
  if (id.value !== route.params?.id) {
    id.value = route.params?.id as string
    info.value = JSON.parse(route.query?.obj as string) ?? {}
  }
})
</script>
<style scoped lang="scss">
@import '@/styles/popup.scss';
.details {
  width: 100%;
  height: 100%;
  background: $l-gray-2;
  .d-container {
    width: 100%;
    height: calc(100vh - 70px);
    overflow: hidden;
    overflow-y: auto;
    .d-header {
      .d-header_img {
        height: 200px;
      }
      .d-title_container {
        background: $l-white;
        box-sizing: border-box;
        padding: $l-spacing-xxl;
        .d-grid-2 {
          .d-title {
            font-size: $l-fz-text-xl;
            margin-bottom: $l-spacing-xs;
            span {
              margin-right: $l-spacing-lg;
            }
          }
          .d-price {
            font-size: $l-fz-title-lg;
            color: $l-red-5;
            font-weight: $l-fw-bold;
            &::after {
              content: ' 猫币';
              font-size: 70%;
            }
          }
        }
        .d-grid-tags {
          display: grid;
          gap: $l-spacing-xxs;
          grid-template-columns: repeat(3, 1fr);
          font-size: $l-fz-text-sm;
          word-break: break-all;
          margin-top: $l-spacing-xxl;

          span {
            box-sizing: border-box;
            border: $l-border-solid $l-gray-3;
            text-align: center;
            font-size: $l-fz-text-sm;
            color: $l-stone-5;
            padding: $l-spacing-xxs;
            border-radius: $l-br-sm;
          }
        }
      }
      .d-warning {
        padding: $l-spacing-lg 0;
        font-size: $l-fz-text-md;
        background: $l-slate-0;
        color: $l-slate-5;
        text-align: center;
        span {
          margin-left: 6px;
        }
      }
    }
    .d-cell {
      box-sizing: border-box;
      padding: $l-spacing-lg;
      i {
        color: $l-red-5;
        font-weight: bold;
      }
      .d-cell-title {
        font-size: $l-fz-title-md;
        padding: $l-spacing-lg 0;
      }
      .d-cell_grid-2 {
        display: grid;
        gap: $l-spacing-lg;
        grid-template-columns: repeat(2, 1fr);
      }
      .d-cell-content {
        .d-cell_item-pd {
          padding: $l-spacing-lg;
        }
        .d-cell_content-item {
          box-sizing: border-box;
          border-radius: $l-br-md;
          font-size: $l-fz-text-xl;
          color: $l-gray-8;
          background-color: $l-white;
          .d-cell_tag {
            margin-top: 10px;
          }
        }
      }
    }
  }

  .d-footer {
    width: 100%;
    height: 70px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.1);
    padding: $l-spacing-lg;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    .grid-btns {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
  }
}
</style>
