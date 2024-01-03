/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-29 10:45:56
 * @LastEditTime: 2023-12-30 21:06:15
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import type { ResponseEntity, Recordable } from '@/typings'

interface BasicsResponseParams {
  data?: Recordable
  type?: 'success' | 'error'
  message?: string
}

export interface IQueryParams {
  data: Recordable
  query?: Recordable
  pageNum?: number
  pageSize?: number
  total?: number
  search?: Recordable | ISearchParams
}

export interface ISearchParams {
  key?: string | number
  value?: string | number
}

export const initPaginationStatus = (obj: IQueryParams) => {
  const defaultObj: IQueryParams = {
    data: [],
    query: {},
    search: {},
    pageNum: 1,
    pageSize: 15,
    total: 0,
  }

  if (obj) {
    return { ...defaultObj, ...obj }
  }

  return defaultObj
}

const defaultResult: ResponseEntity = {
  code: 0,
  message: 'success',
  data: {},
}

export const basicsResponse = ({
  data = {},
  type = 'success',
  message = '',
}: BasicsResponseParams) => {
  if (type === 'error') {
    defaultResult.code = 1
    defaultResult.message = message ? message : 'error'
    return defaultResult
  }
  defaultResult.data = data
  return defaultResult
}

const resetResponse = ({ seachList, pageNum, pageSize, total }: Recordable) => {
  let newList: Recordable = []
  newList = seachList.slice((pageNum - 1) * pageSize, pageNum * pageSize)
  const data = { list: newList, total }
  return data
}

export const paginationResponse = (obj: IQueryParams) => {
  const { data, total, pageNum, pageSize, query, search } =
    initPaginationStatus(obj)
  let seachList: Recordable = []

  if (search?.key && search?.value) {
    if (query && Object.keys(query).length > 0) {
      Object.keys(query).forEach((key: any) => {
        seachList = data.filter(
          (item: Recordable) =>
            item[key] === query[key] || item[search.key] === search.value,
        )
      })
      return resetResponse({ seachList, total, pageNum, pageSize })
    }
    seachList = data.filter(
      (item: Recordable) => item[search.key] === search.value,
    )
    return resetResponse({ seachList, total, pageNum, pageSize })
  }

  if (query && Object.keys(query).length > 0) {
    Object.keys(query).forEach((key: any) => {
      seachList = data.filter((item: Recordable) => item[key] === query[key])
    })
    return resetResponse({ seachList, total, pageNum, pageSize })
  }

  return resetResponse({ seachList: data, total, pageNum, pageSize })
}
