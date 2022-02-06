<template>
	<v-row
		class="d-flex justify-center align-center fill-height"
		style="background: linear-gradient(-135deg,#ababab,#000000);"
	>
		<v-col
			cols="12"
			sm="10"
			md="8"
			lg="6"
		>
			<v-card>
				<v-card-title class="d-flex justify-center">
					<h4 class="text-h4">Cosmos App</h4> <br>
				</v-card-title>

				<v-card-subtitle class="d-flex justify-center">
					<span> Register </span>
				</v-card-subtitle>

				<v-card-text>
					<v-container>
						<v-text-field
							v-model="email"
							label="E-mail"
							required
						/>

						<v-text-field
							v-model="password"
							required
							:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
							:type="show1 ? 'text' : 'password'"
							name="input-10-1"
							label="Password"
							hint="At least 8 characters"
							counter
							@click:append="show1 = !show1"
						/>
					</v-container>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						class="mr-4"
						color="primary"
						@click="$router.push('/login')"
					>
						go back
					</v-btn>

					<v-btn
						@click="submit"
						color="success"
					>
						submit
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>
</template>

<script lang="ts">
	import { defineComponent, ref } from "@vue/composition-api";
	import AuthModule from '@/store/modules/Auth';
	import { useRoute, useRouter } from 'vue2-helpers/vue-router';
	import SnackbarModule from "@/store/modules/Snackbar";

	const route = useRoute();

	export default defineComponent({
		name: 'Registration',

		setup() {
			const router = useRouter();

			let show1 = ref(false);
			let email = ref('');
			let password = ref('');

			const submit = (async () => {
				try {
					await AuthModule.signup({ email: email.value, password: password.value });
					await SnackbarModule.showSnackbarMessage('Registration was successful');
					await router.push('/');
				} catch (err) {
					await SnackbarModule.showSnackbarMessage(
						err.message || 'Failed to authenticate, try later.'
					);
				}
			});

			return {
				show1,
				email,
				password,
				submit,
			}
		}
	});
</script>

<style lang="scss" scoped>

</style>