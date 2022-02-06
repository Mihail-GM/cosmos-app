// @ts-ignore
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Vue from "vue";
import Vuex from "vuex";
import FavoritesModel from "@/models/interface/FavoritesModel";

Vue.use(Vuex);
const store = new Vuex.Store({});
import FavoriteService from "@/services/favorites.services"

// @ts-ignore
@Module({ name: "Favorites", dynamic: true, namespaced: true, store })
class Favorites extends VuexModule {
	favorites: FavoritesModel[] = [];

	get getFavorites() {
		return this.favorites;
	}

	@Mutation
	private setFavorites(favorites: FavoritesModel[]): void {
		this.favorites = favorites;
	}

	@Action
	public async fetchFavorites(): Promise<void> {
		let favoritesResponseData: FavoritesModel[] = [];
		let data = await FavoriteService.getAllFavorites();

		if (data) {
			favoritesResponseData = Object.entries(data)
				.map(([key, value]) => ({
					// @ts-ignore
					...value,
					uuid: key,
				}));
		}

		this.setFavorites(favoritesResponseData);
	}
}

export default getModule(Favorites);
