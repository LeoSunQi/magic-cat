/*
 * @Description:
 * @Author: LeoSunQi
 * @Date: 2023-12-28 19:51:49
 * @LastEditTime: 2023-12-28 23:53:29
 * Copyright (c) 2023 by LeoSunQi, All Rights Reserved.
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './router/permission'
import './styles/index.scss'
import './styles/vant'
import { setupMock } from './mock'

setupMock()
const app = createApp(App)
app.use(router).use(store).mount('#app')
