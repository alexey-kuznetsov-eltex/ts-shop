import './style.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Aura from '@primeuix/themes/aura'
import './style.css'
import 'primeicons/primeicons.css'

import Button from 'primevue/button'
import Card from 'primevue/card'
import Toast from 'primevue/toast'
import Paginator from 'primevue/paginator'
import RadioButton from 'primevue/radiobutton'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Select from 'primevue/select'
import Chip from 'primevue/chip'
import ProgressSpinner from 'primevue/progressspinner';

import App from './App.vue'

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
app.use(ToastService)

app.component('Button', Button)
app.component('Card', Card)
app.component('Toast', Toast)
app.component('Paginator', Paginator)
app.component('RadioButton', RadioButton)
app.component('InputText', InputText)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('Select', Select)
app.component('Chip', Chip)
app.component('ProgressSpinner', ProgressSpinner)

app.mount('#app')
