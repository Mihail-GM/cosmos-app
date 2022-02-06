<template>
	<div class="d-flex justify-center align-center flex-column">
		<v-row>
			<v-col>
				<v-menu
					v-model="menu"
					:close-on-content-click="false"
					transition="scale-transition"
					offset-y
					min-width="auto"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="datesInput"
							label="Select time period "
							prepend-icon="mdi-calendar"
							readonly
							v-bind="attrs"
							v-on="on"
						></v-text-field>
					</template>
					<v-date-picker
						v-model="datesInput"
						range
						:allowed-dates="(date) => date <= new Date().toISOString().substr(0, 10)"
					/>
				</v-menu>
				<span> To show images for different dates please select time period:</span> <br>
				<small> Click on one image to open in gallery</small>
			</v-col>
		</v-row>

		<v-row/>

		<div v-if="isLoading" style="width:90%">
			<h4>Loading please waith...</h4>
			<v-progress-linear
				indeterminate
				color="black"
			></v-progress-linear>
		</div>

		<v-row>
			<v-col>
				<div v-if="isLoading === false">
					<viewer
						class="viewer"
						style="text-align: center;"
						ref="viewer"
						:options="{movable: false, scalable: false, rotatable: false, navbar: true}"
						:images="imagesURLSourcesToDisplay"
					>
						<template #default="scope">
							<img
								style="max-width: 180px; border: 5px solid #CCC; padding: 5px; margin: 4px; cursor: pointer;"
								v-for="(src,index) in scope.images"
								:key="src + index + '-img-key'"
								:src="src"
								:alt="`Image of earth - ${index}`"
							>
						</template>
					</viewer>
				</div>
			</v-col>
		</v-row>
		<h2 v-if="showHeader" class="mb-5"> You are seeing most recent enhanced earth image</h2>

	</div>
</template>

<script lang="ts">
	import { defineComponent, ref, onBeforeMount, watch } from "@vue/composition-api";
	import NasaService from "@/services/nasa.services"
	import { component as Viewer } from "v-viewer"

	export default defineComponent({
		name: 'MostRecentEnhancedEarthImage',

		components: {
			Viewer
		},

		setup() {
			let showHeader = ref<boolean>(true);
			let isLoading = ref<boolean>(false);
			let menu = ref(false);

			let datesInput = ref<string>();
			let datesInSelectedTimePeriod = ref<string[]>([]);

			let availableDatesForImages = ref<string[]>([]);
			let resultDatesToGetImagesFor = ref<string[]>([])
			let imagesURLSourcesToDisplay = ref<string[]>([]);

			const getDatesBetweenDates = (startDateFromPeriod: string, endDateFromPeriod: string) => {
				let startDate = new Date(startDateFromPeriod);
				let endDate = new Date(endDateFromPeriod);

				let tempDates: any = [];
				const theDate = new Date(startDate);

				while (theDate <= endDate) {
					tempDates = [...tempDates, new Date(theDate).toISOString().slice(0, 10)];
					theDate.setDate(theDate.getDate() + 1);
				}

				return tempDates;
			};

			const getArraysIntersection = (arrayWithSelectedDates: string[], availableDates: string[]): string[] => {
				let setA = new Set(arrayWithSelectedDates);
				let setB = new Set(availableDates);
				let intersection = new Set([...setA].filter(x => setB.has(x)));

				return Array.from(intersection);
			};

			const createURLForTheImage = (date: string, id: string): string => {
				return `https://api.nasa.gov/EPIC/archive/enhanced/${date}/png/${id}.png?api_key=WoIVOrcpHcL5xH373gGDg9dKwQIkL0DJLuSbLeot`;
			};

			const getMostRecentEnhancedImage = ((date: string = "") => {
				return NasaService.getMostRecentEnhancedImage(date)
					.then((res) => {
						return res[0];
					});
			});

			const getUrlForAllImages = (allDatesForImages: string[]) => {
				allDatesForImages.forEach(async (date: string) => {
					let resultImage = await getMostRecentEnhancedImage(date);
					let formattedDate: string = date.replaceAll('-', '/');

					let urlImage = createURLForTheImage(formattedDate, resultImage.image);

					let myImage = new Image();
					myImage.onload = (() => {
						imagesURLSourcesToDisplay.value.push(myImage.src);
						isLoading.value = false;
					});
					myImage.src = urlImage;
				});
			};

			watch(datesInput, (newValue) => {
				if (newValue?.length === 2) {
					showHeader.value = false;
					isLoading.value = true;

					try {
						imagesURLSourcesToDisplay.value = [];
						datesInSelectedTimePeriod.value = getDatesBetweenDates(newValue[0], newValue[1]);
						resultDatesToGetImagesFor.value = getArraysIntersection(datesInSelectedTimePeriod.value, availableDatesForImages.value);
						getUrlForAllImages(resultDatesToGetImagesFor.value);
					} catch (e) {
						isLoading.value = false;
					}
				}
			});

			const getAllDatesForEnhancedImages = (() => {
				return NasaService.getAllDatesForEnhancedImages()
					.then((res) => {
						availableDatesForImages.value = res.reduce((acc: any, value: any) => {
							const { date } = value;
							acc.push(date);
							return acc;
						}, []);
						return res;
					});
			});

			const getMostRecentEnhancedImageURL = (async () => {
				let result = await getMostRecentEnhancedImage();

				let formattedDate: string = result.date.replaceAll('-', '/');
				formattedDate = formattedDate.split(' ')[0];

				imagesURLSourcesToDisplay.value.push(createURLForTheImage(formattedDate, result.image));
			});

			onBeforeMount(async () => {
				await getMostRecentEnhancedImageURL();
				await getAllDatesForEnhancedImages();
			});

			return {
				showHeader,
				isLoading,
				menu,
				datesInput,
				datesInSelectedTimePeriod,
				availableDatesForImages,
				resultDatesToGetImagesFor,
				imagesURLSourcesToDisplay,

				getAllDatesForEnhancedImages,
				getArraysIntersection,
				getUrlForAllImages,
				getMostRecentEnhancedImageURL,
				getMostRecentEnhancedImage,
			}
		}
	});
</script>
