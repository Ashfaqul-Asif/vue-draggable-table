import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import moment from "moment"

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.config.productionTip = false
Vue.use(VueToast, { dismissible: true });
Vue.prototype.$m = moment

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
