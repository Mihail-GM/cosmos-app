<template>
	<div>
		<v-navigation-drawer
			v-model="drawer"
			fixed
			app
			dark
			color="black"
		>
			<TheLayoutWrapMenuList
				v-if="items"
				:items-prop="items"
			/>
		</v-navigation-drawer>

		<v-app-bar app dark color="black">
			<v-btn icon @click="drawer = !drawer">
				<v-icon x-large> mdi-rocket</v-icon>
			</v-btn>

			<h2 style="cursor:pointer" @click.stop="$router.push('/')">Cosmos app</h2>
			<v-spacer></v-spacer>
			<v-icon cursor @click.stop="$router.push('/profile')" x-large> mdi-account-circle</v-icon>
			<v-icon cursor class="ml-4" @click.stop="logout" x-large> mdi-logout-variant</v-icon>
		</v-app-bar>

		<v-main class="pa-2 mt-5">
			<transition name="scale" mode="out-in">
				<v-container :key="$router.currentRoute.path">
					<router-view></router-view>
				</v-container>
			</transition>
		</v-main>
	</div>
</template>

<script>
	import {defineComponent, ref} from "@vue/composition-api";
	import TheLayoutWrapMenuList from "./TheLayoutWrapMenuList";
	import AuthModule from '@/store/modules/auth'
	import {useRoute, useRouter} from "vue2-helpers/vue-router";

	const route = useRoute();

	export default defineComponent({
		name: "TheLayoutWrap",
		components: {
			TheLayoutWrapMenuList
		},

		setup() {
			const router = useRouter();

			const drawer = ref(true)
			const items = ref([
				{
					icon: 'mdi-home-circle',
					title: 'Home',
					to: '/'
				},

				{
					icon: 'mdi-clock',
					title: 'Picture of the Day',
					to: '/picture-of-the-day'
				},

				{
					icon: 'mdi-space-station',
					title: 'Your location',
					to: '/earth-image'
				},

				{
					icon: 'mdi-earth',
					title: 'Earth images',
					to: '/enhanced-earth-image'
				},

			])

			const logout = (() => {
				AuthModule.logout();
				router.push('/login');
			})

			return {
				drawer,
				items,
				logout,
			};
		},
	});
</script>

<style scoped>
	@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

	.scale-enter-active,
	.scale-leave-active {
		transition: all 0.4s ease;
	}


	.scale-enter-from,
	.scale-leave-to {
		opacity: 0;
		transform: scale(0.9);
	}
</style>