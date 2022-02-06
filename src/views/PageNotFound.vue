<template>
	<div class="d-flex justify-center align-center flex-column" style="height: 100vh;">
		<div class="blue--text text-h1"> 404</div>
		<h1 class=""> PAGE NOT FOUND </h1>

		<div class="px-10">
			<h2 class="text--secondary"> Oops! You weren't supposed to see this </h2>
			<small class="text--secondary"> The page you are looking for doesn't exist.</small>
		</div>

		<v-btn
			class="pa-10 mt-5"
			dark
			@click.stop="$router.push('/')"
		>
			<v-icon x-large> mdi-rocket</v-icon>
			Flight back to the home page
		</v-btn>
	</div>
</template>

<script>

	export default {
		name: 'PageNotFound',
	}
</script>
