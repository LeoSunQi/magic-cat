/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-29 11:50:38
 * @LastEditTime: 2023-12-31 17:56:33
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import M_BREED from './a-breed'
import M_PROFILES from './a-profiles'
import M_COMMON from './a-common'

const apis = {
  ...M_BREED,
  ...M_PROFILES,
  ...M_COMMON,
}

export default apis
