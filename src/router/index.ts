import Vue from 'vue'
// @ts-ignore
import VueRouter, { RouteConfig } from 'vue-router'

import Home from '../views/Home.vue'
import AppContent from "@/AppContent.vue";
import Registration from "@/views/Registration.vue";
import Login from "@/views/Login.vue";
import PictureOfTheDay from "@/views/PictureOfTheDay.vue";
import EarthImageOnLocation from "@/views/EarthImageOnLocation.vue";
import MostRecentEnhancedEarthImage from "@/views/MostRecentEnhancedEarthImage.vue";
import Profile from "@/views/Profile.vue";
import PageNotFound from "@/views/PageNotFound.vue";

import AuthModule from "@/store/modules/Auth"

// @ts-ignore
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: '/',
		component: AppContent,

		children: [
			{
				path: '',
				redirect: '/dashboard',
				meta: { requiresAuth: true },
			},

			{
				path: '/dashboard',
				component: Home,
				meta: { requiresAuth: true },
			},

			{
				path: '/picture-of-the-day',
				component: PictureOfTheDay,
				meta: { requiresAuth: true },
			},

			{
				path: '/earth-image',
				component: EarthImageOnLocation,
				meta: { requiresAuth: true },
			},

			{
				path: '/enhanced-earth-image',
				component: MostRecentEnhancedEarthImage,
				meta: { requiresAuth: true },
			},

			{
				path: '/profile',
				component: Profile,
				meta: { requiresAuth: true },
			}
		],
	},

	{
		path: '/login',
		component: Login,
	},

	{
		path: '/register',
		component: Registration,
	},

	{ path: '/404', component: PageNotFound },
	{ path: '*', redirect: '/404' },
];

// @ts-ignore
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to: any, _: any, next: any) => {
	AuthModule.tryLogin();

	if (to.meta.requiresAuth && !AuthModule.getIsAuthenticated) {
		next('/login');
	} else if (to.meta.requiresUnauth && AuthModule.getIsAuthenticated) {
		next('/');
	} else {
		next();
	}
});

export default router;
