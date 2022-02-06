<template>
	<div class="d-flex justify-center align-center flex-column">
		<v-icon x-large> mdi-rocket-outline</v-icon>
		<h1> COSMOS APP </h1>
		<h2 class="my-5">Explore the Earth from the Cosmos</h2>

		<div>
			<span> With this app you can enjoy our beautiful planet from several different perspectives:</span>
			<ul class="ml-6">
				<li>NASA's photo of the day</li>
				<li>Latest photo on your location from space</li>
				<li>Images of the Earth in date range</li>
			</ul>
		</div>

		<v-row class="mt-10">
			<v-col
				v-for="card in cards"
				:key="card.title"
				:cols="12"
				:lg="`${card.flex}`"
				md="12"
				sm="12"
				xs="12"
			>
				<v-hover v-slot="{ hover }">
					<v-card
						class="mx-auto"
						max-width="500"
						height="200"
						max-height="250"
						:elevation="hover ? 12 : 5"
						:class="{ 'on-hover': hover }"
						link
						outlined
						@click.native="$router.push(`${card.link}`)"
					>
						<v-list-item three-line>
							<v-list-item-content>
								<v-list-item-title class="text-h5 mb-1 font-weight-bold">
									{{ card.title }}
								</v-list-item-title>
								<v-spacer></v-spacer>

								<v-list-item-subtitle>
									{{ card.text }}
								</v-list-item-subtitle>
							</v-list-item-content>

							<v-icon
								size="70"
								class="pt-5 mt-2"
								:color="hover ? 'gray' : 'black'"
							>
								{{ card.icon }}
							</v-icon>
						</v-list-item>

						<v-card-actions>
							<v-btn
								text
								color="#1867C0"
								@click.stop="$router.push(`${card.link}`)"
							>
								<u> Go to page </u>
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-hover>
			</v-col>
		</v-row>

	</div>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { ref } from "@vue/composition-api";

	export default Vue.extend({
		name: 'Home',

		setup() {
			let cards = ref([
				{
					title: 'Picture of the Day',
					text: 'See the NASA pickup for the astronomy picture of the day',
					link: '/picture-of-the-day',
					icon: 'mdi-clock',
					flex: 4
				},
				{
					title: 'Your location',
					text: 'Head over to see your location from space.',
					link: '/earth-image',
					icon: 'mdi-space-station',
					flex: 4
				},
				{
					title: 'Earth images',
					text: 'Choose time period and see image on earth for each day from that period',
					link: '/enhanced-earth-image',
					icon: 'mdi-earth',
					flex: 4
				},
			]);

			return {
				cards
			}
		}
	})
</script>
