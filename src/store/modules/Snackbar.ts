// @ts-ignore
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({});

// @ts-ignore
@Module({ name: "Snackbar", dynamic: true, namespaced: true, store })
class Snackbar extends VuexModule {
	snackbarMessage = '';
	showSnackbar = false;

	get getSnackbarMessage() {
		return this.snackbarMessage;
	}

	get getShowSnackbar() {
		return this.showSnackbar;
	}

	@Mutation
	private setSnackbarMessage(message: string): void {
		this.snackbarMessage = message;
	}

	@Mutation
	public setShowSnackbar(showSnackbar: boolean): void {
		this.showSnackbar = showSnackbar;
	}

	@Action
	public async showSnackbarMessage(messageData: string): Promise<void> {
		await this.setSnackbarMessage(messageData)
		this.setShowSnackbar(true);
	}
}

export default getModule(Snackbar);
