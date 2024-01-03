/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2024-01-02 10:46:32
 * @LastEditTime: 2024-01-02 14:27:25
 * Copyright (c) 2024 by LeoSunQi, All Rights Reserved.
 */
export interface tagsProvider {
  /**
   * @description 标签内容
   */
  text?: string
  /**
   * @description 标签对齐方式
   */
  align?: 'left' | 'right'
}

export interface titleContentProvider {
  /**
   * @description 标题
   */
  title?: string
  /**
   * @description 编号
   */
  desc?: string | number
}

export interface contentProvider {
  /**
   * @description
   */
  text?: string | number
  /**
   * @description 前缀
   */
  prefix?: string
  /**
   * @description 后缀
   */
  suffix?: string
}

export interface desProvider {
  /**
   * @description 第x代
   */
  level?: string | number
  /**
   * @description xx 分钟
   */
  minute?: string | number
  /**
   * @description 状态
   */
  status?: string | number
}

export interface carCardProps {
  /**
   * @description 标签内容
   */
  tags?: tagsProvider
  /**
   * @description 标签位置
   * @example offset: [0, 0]
   */
  offset?: Array<number | string>
  /**
   * @description 图片地址
   */
  url?: string
  /**
   * @description 图片大小
   */
  imgSize?: string | number
  /**
   * @description 标题
   */
  titleContent?: titleContentProvider
  /**
   * @description 内容
   */
  content?: contentProvider
  /**
   * @description 第x代
   */
  desc?: desProvider
  /**
   * @description 卡片样式
   */
  cardStyle?: Record<string, any>
  /**
   * @description 卡片标签样式
   */
  cardTagStyle?: Record<string, any>
  /**
   * @description 内容样式
   */
  contentStyle?: Record<string, any>
}
