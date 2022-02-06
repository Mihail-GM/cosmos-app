<template>
	<div>
		<v-row class="d-flex justify-center align-center flex-column">
			<h3 class="mb-5"> NASA: Astronomy Picture of the Day</h3>
			<v-col
				cols="12"
				md="8"
				sm="8"
				lg="9"
			>

				<v-card
					class="mx-auto"
				>
					<v-img
						class="picture-of-the-day"
						max-height="450px"
						lazy-src="https://cdn.pixabay.com/photo/2013/03/11/02/13/black-hole-92358_960_720.jpg"
						:src.sync="astronomyPictureOfTheDayURL"
						alt="Picture of the day"
						title="Nasa picture"
					>

						<div class="d-flex justify-center align-center" style="height: 50vh;">

							<v-progress-linear
								v-if="isLoading"
								indeterminate
								color="cyan"
							></v-progress-linear>

							<h2

								v-if="isImageFound === false"
							>
								No image available for this date. Please try another.
							</h2>
						</div>

					</v-img>
					<v-card-actions>
						<v-menu
							v-model="menu"
							:close-on-content-click="false"
							transition="scale-transition"
							offset-y
							min-width="auto"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									v-model="date"
									label="Date  APOD"
									prepend-icon="mdi-calendar"
									readonly
									v-bind="attrs"
									v-on="on"
								></v-text-field>
							</template>
							<v-date-picker
								v-model="date"
								:allowed-dates="(date) => date <= new Date().toISOString().substr(0, 10)"
								@input="menu = false"
							></v-date-picker>
						</v-menu>
						<v-spacer></v-spacer>

						<v-tooltip
							v-if="isImageInFavorite === false"
							bottom
						>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									id="add-to-favorites"
									color="black"
									style="color:white"
									@click.native="saveToFavorite()"
									icon
									v-bind="attrs"
									v-on="on"
								>
									<v-icon>mdi-heart</v-icon>
								</v-btn>

							</template>
							<span>Add to favorite</span>
						</v-tooltip>

						<v-tooltip
							v-if="isImageInFavorite"
							bottom
						>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									id="remove-from-favorites"
									color="black"
									style="color:white"
									@click="removeFromFavorites"
									icon
									v-bind="attrs"
									v-on="on"
								>
									<v-icon>mdi-heart-off</v-icon>
								</v-btn>

							</template>
							<span>Remove</span>
						</v-tooltip>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>

	</div>
</template>

<script lang="ts">
	import { defineComponent, ref, onBeforeMount, watch } from "@vue/composition-api";
	import NasaService from "@/services/nasa.services"
	import FavoritesService from "@/services/favorites.services"
	import SnackbarModule from "@/store/modules/Snackbar"
	import FavoritesModel from "@/models/interface/FavoritesModel";

	export default defineComponent({
		name: 'PictureOfTheDay',

		components: {},

		setup() {
			let astronomyPictureOfTheDayURL = ref<string>();
			let date = ref<string>((new Date().toJSON().slice(0, 10)));
			let menu = ref<boolean>(false);
			let isLoading = ref<boolean>(false);
			let isImageFound = ref<boolean>(true);
			let isImageInFavorite = ref<boolean>(false);

			let currentSavedImage = ref<FavoritesModel>({ uuid: "", data: "" });

			const getAstronomyPictureOfTheDay = ((date: string = "") => {
				isImageFound.value = true;
				isLoading.value = true;

				NasaService.getAstronomyPictureOfTheDay(date)
					.then((res) => {
						isLoading.value = false;
						astronomyPictureOfTheDayURL.value = res.url;

						if (astronomyPictureOfTheDayURL.value?.includes('youtube.com')) {
							isImageFound.value = false;
						}
					})
					.catch(() => {
						isImageFound.value = false;
					})
			});

			watch(date, (newValue) => {
				isImageInFavorite.value = false;
				getAstronomyPictureOfTheDay(newValue.toString());
			});

			const saveToFavorite = (() => {
				return FavoritesService.addFavorites({ image: astronomyPictureOfTheDayURL.value })
					.then((res) => {
						SnackbarModule.showSnackbarMessage("Image saved in favorites");
						isImageInFavorite.value = true;
						currentSavedImage.value = { uuid: res.name, data: "" };
					})
					.catch(() => {
						SnackbarModule.showSnackbarMessage("Something went wrong. Image not saved");
					});
			});

			const removeFromFavorites = (() => {
				FavoritesService.deleteFavorite(currentSavedImage.value)
					.then(() => {
						SnackbarModule.showSnackbarMessage("Image removed from favorites");
						isImageInFavorite.value = false;
					})
					.catch(() => {
						SnackbarModule.showSnackbarMessage("Something went wrong. Failed to remove the image");
					});
			});

			onBeforeMount(async () => {
				await getAstronomyPictureOfTheDay();
			});

			return {
				astronomyPictureOfTheDayURL,
				getAstronomyPictureOfTheDay,
				date,
				menu,
				saveToFavorite,
				isLoading,
				isImageFound,
				removeFromFavorites,
				isImageInFavorite,
				currentSavedImage
			}
		}
	});
</script>

<style lang="scss" scoped>

</style>
