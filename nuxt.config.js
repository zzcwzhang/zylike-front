const pkg = require('./package')


const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const axios = require('axios');

let axiosConfig = {};
if (process.env.NODE_ENV == 'development') {
	axiosConfig = {
		axios: {
			baseURL: 'http://localhost:8082',
			proxy: true,
			credentials: true,
			debug: true,
			retry: true,
		},
		proxy: {
			'/api': {
				target: 'https://manage.zylike.com',
				pathRewrite: {
					'^/api': '/api',
				}
			}
		},
	}
} else if (process.env.NODE_ENV == 'remote') {
	axiosConfig = {
		axios: {
			proxy: true,
			credentials: true,
			debug: true,
			retry: false,
		},
		proxy: {
			'/api': {
				target: 'https://manage.zylike.com',
				pathRewrite: {
					'^/api': '/api',
				}
			}
		},
	}
} else if (process.env.NODE_ENV == 'production') {
	axiosConfig = {
		axios: {
			baseURL: 'https://manage.zylike.com',
			retry: true
		},
	}
}


module.exports = {
	mode: 'universal',
	env: {
		NODE_ENV: process.env.NODE_ENV,
		IO_URL: process.env.NODE_ENV == 'development' ? 'http://localhost:8082' : '',
	},

	// 动态路由
	generate: {
		routes: function() {
			return axios.get('https://manage.zylike.com/api/article/list')
				.then((res) => res.data).then((resdata) => {
					const {
						data
					} = resdata;
					return data.map(md => {
						return `/article/${md.mid}`;
					})
				})
		}
	},

	/*
	 ** Headers of the page
	 */
	head: {
		title: process.env.NODE_ENV == 'development' ? 'dev' : "欢迎来到zylike技术博客",
		meta: [{
				charset: 'utf-8'
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{
				hid: 'description',
				name: 'description',
				content: "技术，分享，前端，后端，运维，服务器，人生，阅读，技术英语, 设计"
			}
		],
		script: [{
				src: 'https://manage.zylike.com/api/cloudserver/iconfont/url'
			},
			{
				src: 'https://hm.baidu.com/hm.js?80921b763690ec22c4b1aaabdba02e61'
			},
		],
		link: [{
				rel: 'icon',
				type: 'image/x-icon',
				href: '/favicon.ico'
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css?family=ZCOOL+KuaiLe'
			},
		]
	},

	/*
	 ** Customize the progress-bar color
	 */
	loading: {
		color: '#fff'
	},

	/*
	 ** Global CSS
	 */
	css: [
		'~/assets/style/app.styl'
	],

	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		'@/plugins/vuetify',
		'@/plugins/sentry',
		'@/plugins/baidu',
		'@/plugins/fetch',
		/* { src: '@/plugins/vue-mavon-editor', ssr: true}, // 全局注册,ssr:false保证服务器端不会渲染，从而避免document或window找不到的bug */
	],

	/*
	 ** Nuxt.js modules
	 */
	modules: [
		'@nuxtjs/proxy',
		'@nuxtjs/axios',
	],

	...axiosConfig,


	/*
	 ** Build configuration
	 */
	build: {
		transpile: ['vuetify/lib'],
		plugins: [new VuetifyLoaderPlugin()],
		loaders: {
			stylus: {
				import: ["~assets/style/variables.styl"]
			}
		},

		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {

		}
	}
}
