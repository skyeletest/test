/* eslint-disable */
const pages = r => require(['../pages/index.vue'], r)
// const pagesLogin = r => require(['../pages/login.vue'], r)
const pagesManage = r => require(['../pages/manage.vue'], r)
const pagesHome = r => require(['../pages/home.vue'], r)
const pagesOptionOne = r => require(['../pages/optionOne.vue'], r)
const pagesOptionTwo = r => require(['../pages/optionTwo.vue'], r)
const pagesOptionThree = r => require(['../pages/optionThree.vue'], r)
const pagesOptionFour = r => require(['../pages/optionFour.vue'], r)
const pagesOptionFive = r => require(['../pages/optionFive.vue'], r)
let routes = [
	{
		path: '/index',
		component: pages,
		name: 'pages',
		meta: {
			requireAuth: true
		}
	},
	/*{
		path: '/login',
		component: pagesLogin,
		name: 'pages-login'
	},*/
	{
		path: '/manage',
		component: pagesManage,
		children: [
			{
				path: '',
				component: pagesHome,
				name: 'pages-home'
			},
			{
				path: '/optionOne',
				component: pagesOptionOne,
				name: 'pages-optionOne',
				meta: ['导航一', '选项一']
			},
			{
				path: '/optionTwo',
				component: pagesOptionTwo,
				name: 'pages-optionTwo',
				meta: ['导航一', '选项二']
			},
			{
				path: '/optionThree',
				component: pagesOptionThree,
				name: 'pages-optionThree',
				meta: ['导航二', '选项一']
			},
			{
				path: '/optionFour',
				component: pagesOptionFour,
				name: 'pages-optionFour',
				meta: ['导航二', '选项二']
			},
			{
				path: '/optionFive',
				component: pagesOptionFive,
				name: 'pages-optionFive',
				meta: ['导航二', '选项三']
			}
		]
	}
]
export default routes
