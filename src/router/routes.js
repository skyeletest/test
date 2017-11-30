/* eslint-disable */
const pages = r => require(['../pages/index.vue'], r)
const pagesHello = r => require(['../pages/Hello.vue'], r)
let routes = [	{
	path: '',
	component: pages,
	name: 'pages'
	},	{
	path: '/Hello',
	component: pagesHello,
	name: 'pages-Hello'
	}]
export default routes
