<template>
	<div class="d-flex justify-center align-center flex-column">
		<h2 class="mb-5"> Image from space on your current location</h2>

		<v-row>
			<v-col>
				<div>
					<viewer
						:options="{movable: false, scalable: false, rotatable: false, navbar: false}"
						:images="[urlImage]"
						class="image-viewer"
						ref="viewer"
					>
						<template #default="scope">
							<img
								v-if="coords.longitude !== ''"
								:src="urlImage"
								alt="Image on your location"
								title="Nasa picture"
								style="width: 100%;
									   height: 500px;
									   object-fit: cover;
									   object-position: bottom;
									   border: 5px solid #555;
									   cursor: pointer;
								"
							/>
						</template>
					</viewer>
					<div class="d-flex justify-center">
						<small> click on image to zoom it</small>
					</div>
				</div>
			</v-col>
		</v-row>

	</div>
</template>

<script lang="ts">
	import { defineComponent, ref, onBeforeMount, computed } from "@vue/composition-api";
	import CoordsModel from "@/models/interface/CoordsModel";
	import 'viewerjs/dist/viewer.css'
	import { component as Viewer } from "v-viewer"

	export default defineComponent({
		name: 'EarthImageOnLocation',

		components: {
			Viewer
		},

		setup(props) {
			let coords = ref<CoordsModel>({
				latitude: '',
				longitude: ''
			});

			let date = ref<string>('2020-08-30');
			let images = ref<string[]>([]);

			const getUserLocation = (() => {
				return navigator.geolocation.getCurrentPosition((position) => {
						coords.value = {
							latitude: position.coords.latitude.toFixed(2),
							longitude: position.coords.longitude.toFixed(2)
						}
					},
					error => {
						console.log(error.message);
					},
				)
			});

			let urlImage = computed(() => {
				return `https://api.nasa.gov/planetary/earth/imagery?lon=${coords.value.longitude}&lat=${coords.value.latitude}&dim=0.15&date=${date.value}&api_key=WoIVOrcpHcL5xH373gGDg9dKwQIkL0DJLuSbLeot`;
			});

			onBeforeMount(async () => {
				await getUserLocation();
			});

			return {
				coords,
				getUserLocation,
				images,
				urlImage
			}
		}
	});
</script>

<style scoped>
</style>
