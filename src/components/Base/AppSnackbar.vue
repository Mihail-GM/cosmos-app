<template>
	<div class="text-center">
		<v-snackbar
			v-model="showSnackbar"
			:multi-line="multiLine"
		>
			{{ snackbarMessage }}

			<template v-slot:action="{ attrs }">
				<v-btn
					color="blue"
					text
					v-bind="attrs"
					@click="closeSnackbar()"
				>
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</div>

</template>

<script lang="ts">
	import { defineComponent, computed, ref } from "@vue/composition-api";
	import SnackbarModule from "@/store/modules/Snackbar"

	export default defineComponent({
		name: "AppSnackbar",

		setup() {
			let multiLine = ref<boolean>(true);
			let snackbarMessage = computed(() => SnackbarModule.getSnackbarMessage);
			let showSnackbar = computed({
				get: () => SnackbarModule.getShowSnackbar,
				set: (value) => SnackbarModule.setShowSnackbar(value)
			});

			const closeSnackbar = (() => {
					showSnackbar.value = false;
				}
			);

			return {
				multiLine,
				showSnackbar,
				snackbarMessage,
				closeSnackbar
			}
		}
	});

</script>

<style lang="scss" scoped>

</style>