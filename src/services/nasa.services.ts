import $axios from '../plugins/axios'

const api_key: string = "WoIVOrcpHcL5xH373gGDg9dKwQIkL0DJLuSbLeot";

class NasaService {
	getAstronomyPictureOfTheDay(date: string) {
		return $axios.get(`planetary/apod`, {
			params: {
				date: date,
				api_key,
			}
		})
			.then(res => {
				return res.data;
			})
	}

	getMostRecentEnhancedImage(date: string) {
		let url = 'EPIC/api/enhanced';

		if (date !== "") {
			url += `/date/${date}`;
		}

		return $axios.get(url, {
			params: {
				api_key,
			}
		})
			.then(res => {
				return res.data;
			})
	}

	getAllDatesForEnhancedImages() {
		return $axios.get(`EPIC/api/enhanced/all`, {
			params: {
				api_key,
			},
		})
			.then(res => {
				return res.data;
			})
	}

}

export default new NasaService();
