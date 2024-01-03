/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-25 19:22:59
 * @LastEditTime: 2023-12-29 12:36:36
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import Clipboard from 'clipboard'
import { showNotify } from 'vant'

export default function useClipboard() {
  /**
   * 成功
   * @param message
   */
  const copySuccess = (message: string) => {
    showNotify({ type: 'success', message })
    return message
  }

  /**
   * 失败
   * @param message
   */
  const copyError = (message = '复制失败') => {
    return message
  }

  /**
   * 复制粘贴
   * @param text [string]: 复制的内容
   * @param event [MouseEvent]: 点击事件的dom节点
   */
  const handleCopy = (text: string, event: MouseEvent) => {
    const clipboard: any = new Clipboard(
      event.target as string | Element | NodeListOf<Element>,
      {
        text: () => text,
      },
    )

    clipboard.on('success', () => {
      copySuccess(text)
      clipboard.destroy()
    })

    clipboard.on('error', () => {
      copyError()
      clipboard.destroy()
    })

    clipboard.onClick(event)
  }

  return {
    handleCopy,
  }
}
