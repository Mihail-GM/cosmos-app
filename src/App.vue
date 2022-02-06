<template>
	<v-app>
		<v-main>
			<router-view/>
			<app-snackbar/>
		</v-main>
	</v-app>
</template>

<script lang="ts">
	import Vue from 'vue';
	import AppSnackbar from "@/components/Base/AppSnackbar.vue";


	export default Vue.extend({
		name: 'App',
		components: { AppSnackbar },
	});
</script>
