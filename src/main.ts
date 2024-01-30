import { createApp } from 'vue'
import './style.css'
import './assets/reset.css'
import App from './App.vue'
import 'virtual:uno.css'
import { routes } from 'vue-router/auto/routes'
import { createRouter,createWebHashHistory } from 'vue-router/auto'
import { createPinia } from 'pinia'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
