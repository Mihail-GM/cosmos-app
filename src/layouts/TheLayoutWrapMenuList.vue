<template>
	<v-list>
		<v-list-item
			v-for="(item, i) in itemsProp"
			:key="i"
			:to="item.to"
			:id="'menu-link-' + i"
			router
			exact
		>
			<v-list-item-action>
				<v-icon>{{ item.icon }}</v-icon>
			</v-list-item-action>
			<v-list-item-content>
				<v-list-item-title v-text="item.title"/>
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>

<script lang="ts">
	import { defineComponent } from "@vue/composition-api";

	export default defineComponent({
		name: "TheLayoutWrapMenuList",
		props: {
			itemsProp: {
				type: Array,
				required: true
			}
		},

		setup() {

			return {};
		},
	});

</script>

<style scoped>

</style>
