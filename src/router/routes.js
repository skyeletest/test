/* eslint-disable */
const pages = r => require(['../pages/index.vue'], r)
const pagesLogin = r => require(['../pages/login.vue'], r)
let routes = [	{
	path: '',
	component: pages,
	name: 'pages'
	},	{
	path: '/login',
	component: pagesLogin,
	name: 'pages-login'
	}]
export default routes
