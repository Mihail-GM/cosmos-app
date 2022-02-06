<template>
	<v-app>
		<TheLayoutWrap>
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</TheLayoutWrap>
	</v-app>
</template>

<script lang="ts">
	import { defineComponent } from "@vue/composition-api";
	import TheLayoutWrap from "@/layouts/TheLayoutWrap.vue"

	export default defineComponent({
		name: 'AppContent',
		components: {

			TheLayoutWrap
		},

	})
</script>
