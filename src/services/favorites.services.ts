import $axios from '../plugins/axios'
import FavoritesModel from "@/models/interface/FavoritesModel";

const baseURL = 'https://cosmos-app-e27e4-default-rtdb.europe-west1.firebasedatabase.app';

class FavoriteService {
	getAllFavorites() {
		return $axios.get(`${baseURL}/favorites.json`)
			.then(res => {

				return res.data;
			})
	}

	addFavorites(data: any) {
		return $axios.post(`${baseURL}/favorites.json`, data)
			.then(res => {
				return res.data;
			})
	}

	deleteFavorite(data: FavoritesModel) {
		return $axios.delete(`${baseURL}/favorites/${data.uuid}.json`)
			.then((res) => {
				return res.data;
			});
	}
}

export default new FavoriteService();
