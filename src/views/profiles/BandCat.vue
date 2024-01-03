<template>
  <div class="band-cat">
    <div class="d-container">
      <div class="d-warning" @click="show = true">
        <van-icon name="warning" />
        <span>繁育说明</span>
      </div>
      <div class="cat-container">
        <div class="cat-icon-container">
          <van-icon name="like" size="60" :color="likeColor" />
        </div>
        <div class="cat-cell">
          <div class="cat-cell_title">已选猫猫</div>
          <cat-card
            :url="info.image"
            :title-content="{ title: info.catname, desc: info.catid }"
            :desc="{
              level: info.level,
              minute: info.minute,
              status: info.status,
            }"
          />
        </div>
        <div class="cat-cell">
          <div class="cat-cell_title">我的猫猫</div>
          <cat-card v-show="!selectCat.id" :url="QuestImage" img-size="30%">
            <template #content>
              <div class="cat-div">
                <van-icon name="warning" />
                <span>请选择繁育的猫猫</span>
              </div>
            </template>
          </cat-card>
          <cat-card
            v-show="selectCat.id"
            :url="selectCat.image"
            :title-content="{ title: selectCat.catname, desc: selectCat.catid }"
            :desc="{
              level: selectCat.level,
              minute: selectCat.minute,
              status: selectCat.status,
            }"
          />
        </div>
      </div>
      <div class="cat-list">
        <div class="cat-list_title">选择我的猫猫</div>
        <div
          v-for="c in cats"
          :key="c.id"
          :class="[
            'cat-list_item',
            c.id === selectCat.id ? 'cat-item_active' : '',
          ]"
          @click="onChangCat(c)"
        >
          <van-image :src="c.image" width="50px" height="50px" />
          <div class="item-content">
            <div class="item-content_title">
              {{ c.catname }}
              <span>{{ c.catid }}</span>
            </div>
            <div class="item-content-tags">
              <van-tag plain class="tag">第 {{ c.level }} 代</van-tag>
              <van-tag plain class="tag">{{ c.minute }} 分钟</van-tag>
              <van-tag plain class="tag">{{ c.tag }}</van-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-footer">
      <van-button
        type="primary"
        :disabled="!selectCat.id"
        block
        @click="showConfirm = true"
        >确认</van-button
      >
    </div>
    <van-popup v-model:show="show" position="bottom" closeable>
      <div class="popup-container">
        <div class="popup-title">繁育说明</div>
        <div class="popup-content">
          <ul class="popup-content_ul">
            <li v-for="d in desc" :key="d" class="popup-content_ul-li">
              <div class="popup-content_ul-li-content">{{ d }}</div>
            </li>
          </ul>
        </div>
      </div>
    </van-popup>
    <van-popup v-model:show="showConfirm" position="bottom" closeable>
      <div class="popup-container">
        <div class="popup-title">请确认繁育信息</div>
        <div class="popup-content">
          <div class="popup-gird-2">
            <div class="popup-gird_item">
              <div>繁育价格</div>
              <div class="gird-text">{{ info.price }} 猫币</div>
            </div>
            <div class="popup-gird_item">
              <div>繁育时间</div>
              <div class="gird-text">{{ info.minute }} 小时</div>
            </div>
          </div>
          <div class="popup-warning-desc">
            <van-icon name="warning" />
            <span>本次繁育将额外收取100猫币手续费</span>
          </div>
          <div class="popup-btns">
            <van-button type="primary" block @click="onConfirm"
              >确认</van-button
            >
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script setup lang="ts">
import { onActivated, ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { CatCard } from '@/components'
import QuestImage from '@/assets/question.svg'
import apis from '@/api'
import useAppStore from '@/store/use-app'
import { showToast } from 'vant'
import router from '@/router'

const store = useAppStore()
const route = useRoute()
const id = ref(route.params.id)
const info = ref(JSON.parse(route.query.obj as string))
const show = ref(false)
const cats = ref<Record<string, any>[]>([])
const selectCat = ref<Record<string, any>>({})
const showConfirm = ref(false)
const desc = [
  '• 繁育时只能选择目前为正常状态的魔力猫，如果猫猫已发布出售或繁育，或者当前处于休息状态，都将不会在选择列表中显示；',
  '• 魔力猫共有雌性和雄性两种性别，只有异性的猫猫才能进行繁育，同性的猫猫不会在选择列表中显示 ；',
  '• 每笔繁育交易将额外收取一定比例的手续费用，在确认繁育信息中可以查看手续费用。',
]

const likeColor = computed(() => {
  return selectCat.value.id ? '#ef4444' : ''
})

const onConfirm = () => {
  if (store.userinfo.currency < info.value.price) {
    showToast('购买失败，您的猫币不足')
    return
  }
  router.push('/result/1')
}

const onChangCat = (obj: Record<string, any>) => {
  selectCat.value = obj
}

const getMycats = async () => {
  const { code, data } = await apis.MProfileMyCat({})
  if (+code === 0) {
    cats.value = data.list
  }
}

onActivated(() => {
  if (id.value !== route.params.id) {
    id.value = route.params.id
    info.value = JSON.parse(route.query.obj as string)
  }
})

onMounted(() => {
  getMycats()
})
</script>
<style scoped lang="scss">
@import '@/styles/popup.scss';
.band-cat {
  width: 100%;
  height: 100%;
  background: $l-gray-2;
  .d-container {
    width: 100%;
    height: calc(100vh - 70px);
    overflow: hidden;
    overflow-y: auto;
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
    .cat-container {
      box-sizing: border-box;
      width: 100%;
      padding: $l-spacing-xl;
      display: grid;
      gap: $l-spacing-xl;
      grid-template-columns: repeat(2, 1fr);
      position: relative;
      .cat-icon-container {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        transform: translate(-50%, -50%);
      }
      .cat-cell {
        height: 100%;
        .cat-cell_title {
          padding: $l-spacing-xl 0;
        }
        .cat-box {
          width: 100%;
          background: $l-slate-1;
        }
        .cat-div {
          margin-top: 10px;
          text-align: center;
          color: $l-gray-5;
          font-size: 14px;
          span {
            margin-left: 6px;
          }
        }
      }
    }
    .cat-list {
      box-sizing: border-box;
      padding: $l-spacing-xl;
      .cat-list_title {
        font-size: 18px;
        padding: 15px 0;
      }
      .cat-list_item {
        box-sizing: border-box;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 3fr;
        background: $l-white;
        padding: 15px;
        margin-bottom: 15px;
        border-radius: 6px;
        .item-content {
          .item-content_title {
            margin-bottom: 8px;
          }
          .item-content-tags {
            .tag {
              margin-right: 10px;
            }
          }
        }
      }
      .cat-item_active {
        background: $l-amber-0;
        color: $l-amber-6;
        border: $l-border-solid $l-amber-4;
      }
    }
  }

  .d-footer {
    width: 100%;
    height: 70px;
    box-sizing: border-box;
    background: $l-white;
    padding: $l-spacing-lg;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
