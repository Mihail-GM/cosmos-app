import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $axios from './plugins/axios'
import store from '@/store/index'
import vuetify from './plugins/vuetify'
import VueCompositionAPI from "@vue/composition-api"
// @ts-ignore

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer);

/** Axios plugin settings */
Vue.use({
	install(Vue) {
		Vue.prototype.$axios = $axios
	}
});

Vue.use(VueCompositionAPI);

Vue.config.productionTip = false

new Vue({
	// @ts-ignore
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')

