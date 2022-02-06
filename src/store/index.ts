import Vue from 'vue'
import Vuex from 'vuex'

import Snackbar from "@/store/modules/Snackbar";
import Favorites from "@/store/modules/Favorites";
import Auth from "@/store/modules/Auth";

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {},

	mutations: {},

	actions: {},

	modules: {
		Snackbar,
		Favorites,
		Auth
	}
});

export default store;
