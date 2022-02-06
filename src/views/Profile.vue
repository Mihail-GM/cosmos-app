<template>
	<div class="d-flex justify-center align-center flex-column">
		<h2> Favorite images</h2>
		<v-row>
			<v-col
				v-for="oneFavoriteImage in favorites"
				:key="oneFavoriteImage.uuid"
				class="d-flex child-flex"
				cols="4"
			>
				<v-card>
					<v-img
						:src="oneFavoriteImage.image"
						:lazy-src="oneFavoriteImage.image"
						aspect-ratio="1"
						class="white--text align-end"
						gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
						height="200px"
					>
						<template v-slot:placeholder>
							<v-row
								class="fill-height ma-0"
								align="center"
								justify="center"
							>
								<v-progress-circular
									indeterminate
									color="grey lighten-5"
								></v-progress-circular>
							</v-row>
						</template>

					</v-img>

					<v-card-actions>
						<v-spacer></v-spacer>

						<v-tooltip bottom>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									@click="removeFromFavorites(oneFavoriteImage)"
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
	import { defineComponent, onBeforeMount, computed } from "@vue/composition-api";
	import FavoriteModule from "@/store/modules/Favorites"
	import FavoritesService from "@/services/favorites.services"
	import FavoritesModel from "@/models/interface/FavoritesModel";
	import SnackbarModule from "@/store/modules/Snackbar";

	export default defineComponent({
		name: 'Profile',

		components: {},

		setup() {
			let favorites = computed(() => FavoriteModule.getFavorites);

			const getAllFavoritesImage = (() => {
				return FavoriteModule.fetchFavorites();
			});

			const removeFromFavorites = (async (oneFavoriteImage: FavoritesModel) => {
				await FavoritesService.deleteFavorite(oneFavoriteImage)
					.then(() => {
						SnackbarModule.showSnackbarMessage("Image removed from favorites");
					})
					.catch(() => {
						SnackbarModule.showSnackbarMessage("Something went wrong. Failed to remove the image");
					});
				await getAllFavoritesImage();
			});

			onBeforeMount(async () => {
				await getAllFavoritesImage();
			});

			return {
				getAllFavoritesImage,
				favorites,
				removeFromFavorites
			}
		}

	});
</script>

