/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-28 20:20:04
 * @LastEditTime: 2024-01-03 09:33:10
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
export default {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 375,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false,
      exclude: [/node_modules/],
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568,
    },
  },
}
