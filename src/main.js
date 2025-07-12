import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { worker } from './mocks/browser'

import Axios from 'axios'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

// const baseURL = 'http://localhost:3000'

const axios = Axios.create()

const pinia = createPinia()
pinia.use(({ store }) => {
  store.axios = axios
})
app.use(pinia)

app.use(router)

app.use(PrimeVue, {
  theme: {
    options: {
      darkModeSelector: false,
    },
    preset: Aura,
  },
})
app.use(ToastService)
app.use(DialogService)
app.use(ConfirmationService)

worker.start().then(() => {
  app.mount('#app')
})
