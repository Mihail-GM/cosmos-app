// @ts-ignore
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({});

let timer: number | undefined;
const keyFirebase = 'AIzaSyAXLmbbZWfnUg-lrZYeqlSLng6BWFc_RMg'

import $axios from "@/plugins/axios";

// @ts-ignore
@Module({ name: "Auth", dynamic: true, namespaced: true, store })
class Auth extends VuexModule {
	userId = null;
	token = null;
	didAutoLogout = false;

	get getUserId() {
		return this.userId;
	}

	get getToken() {
		return this.token;
	}

	get getIsAuthenticated() {
		return !!this.token;
	}

	get getDidAutoLogout() {
		return this.didAutoLogout;
	}

	@Mutation
	private setUser(data: { token: any; userId: any; }) {
		this.token = data.token;
		this.userId = data.userId;
		this.didAutoLogout = false;
	}

	@Mutation
	private setAutoLogout() {
		this.didAutoLogout = true;
	}

	@Action
	public async login(data: { email: any; password: any; }): Promise<void> {
		return this.context.dispatch('auth', {
			...data,
			mode: 'login'
		});
	}

	@Action
	public async signup(data: { password: string, email: string }): Promise<void> {
		return this.context.dispatch('auth', {
			...data,
			mode: 'signup'
		});
	}

	@Action
	public async auth(data: { mode: any; email: any; password: any; }) {
		const mode = data.mode;
		let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${keyFirebase}`;

		if (mode === 'signup') {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${keyFirebase}`;
		}

		let dataObject = {
			email: data.email,
			password: data.password,
			returnSecureToken: true
		};

		const response = await $axios.post(url, dataObject)
			.then(res => {

				return res;
			});

		const responseData = response.data;

		if (response.status != 200) {
			const error = new Error(
				responseData.message || 'Failed to authenticate. Check your login data.'
			);
			throw error;
		}

		const expiresIn = +responseData.expiresIn * 1000;
		const expirationDate = new Date().getTime() + expiresIn;

		localStorage.setItem('token', responseData.idToken);
		localStorage.setItem('userId', responseData.localId);
		localStorage.setItem('tokenExpiration', String(expirationDate));

		timer = setTimeout(() => {
			this.context.dispatch('autoLogout');
		}, expiresIn);

		this.context.commit('setUser', {
			token: responseData.idToken,
			userId: responseData.localId
		});
	}

	@Action
	public tryLogin() {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('userId');
		const tokenExpiration = localStorage.getItem('tokenExpiration');

		// @ts-ignore
		const expiresIn = +tokenExpiration - new Date().getTime();

		if (expiresIn < 0) {
			return;
		}

		timer = setTimeout(() => {
			this.context.dispatch('autoLogout');
		}, expiresIn);

		if (token && userId) {
			this.context.commit('setUser', {
				token: token,
				userId: userId
			});
		}
	}

	@Action
	public logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('tokenExpiration');

		clearTimeout(timer);
		this.context.commit('setUser', {
			token: null,
			userId: null
		});
	}

	@Action
	public autoLogout() {
		this.context.dispatch('logout');
		this.context.commit('setAutoLogout');
	}

}

export default getModule(Auth);
