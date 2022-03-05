import { createApp } from 'vue'
import App from './App.vue'
import FloatingVue from 'floating-vue'

import './styles/index.scss'

const app = createApp(App)

app.use(FloatingVue)
app.mount('#app')
