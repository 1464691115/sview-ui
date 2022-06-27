import { createApp } from 'vue'
import App from './App.vue'
import * as sView from '../components/index'

const app = createApp(App)

Object.keys(sView).forEach((key) => {
    key.indexOf('S') == 0 && app.component(sView[key].__name, sView[key])
})

app.mount('#app')
