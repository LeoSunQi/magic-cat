/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-31 20:26:54
 * @LastEditTime: 2024-01-01 22:13:21
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import type { Recordable, ResponseEntity } from '@/typings'
import { ref } from 'vue'

export default function usePullRefresh() {
  const list = ref<Record<string, any>[]>([])
  const refreshing = ref(false)
  const loading = ref(false)
  const finished = ref(false)
  const finishedText = ref('没有更多了')
  const error = ref(false)
  const pageNum = ref(0)
  const pageSize = ref(15)
  const total = ref(0)

  const onLoad = (
    request: (data?: Recordable) => Promise<ResponseEntity>,
    datas?: Recordable,
  ) => {
    if (refreshing.value) {
      list.value = []
      refreshing.value = false
    }
    pageNum.value = pageNum.value + 1

    return new Promise(async (resolve, reject) => {
      try {
        const res = await request({
          pageNum: pageNum.value,
          pageSize: pageSize.value,
          ...datas,
        })
        let newList = []
        newList = res.data.list
        list.value = [...list.value, ...newList]
        total.value = res.data.total
        loading.value = false
        // console.log('res :>> ', res.data.list, pageNum.value)
        // console.log('list :>> ', list.value)
        if (pageNum.value * pageSize.value >= total.value) {
          finished.value = true
          finishedText.value = '没有更多了'
        }

        resolve(res)
      } catch (err) {
        error.value = true
        reject(err)
      }
    })
  }

  const onRefresh = <T>(request: T | any) => {
    list.value = []
    pageNum.value = 0
    total.value = 0
    finished.value = false
    loading.value = true
    return request
  }

  return {
    onRefresh,
    onLoad,
    total,
    pageSize,
    pageNum,
    error,
    finishedText,
    finished,
    loading,
    refreshing,
    list,
  }
}
