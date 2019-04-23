<template>
  <section id="about-page">
		<v-container>
			<v-flex xs12 sm8 md6 lg4 xl4 d-flex>
				<img :src="icon" alt="">
			</v-flex>
			<h1>技术栈</h1>
			<h3 class="ma-3"> 
				主要技术：
			</h3>
			<p>
			Vue: Element-UI、Vuetify、Nuxt
			</p>
			<p>
			ThreeJs: shader
			</p>
			<p>
			Electron: electron-vue
			</p>
			<p>
			React: Next、Ant
			</p>
			后端语言：
			NodeJs: Koa
			<h3 class="ma-3">运维技术</h3>
			<p> Docker </p>
			<p> Nginx </p>
			<p> Webpack、Gulp、pm2 </p>
			<h3 class="ma-3"> 其他语言： </h3>
			<p>
			Python: PyQt5
			网络爬虫:  selenium (一般使用python或node版)
			Java: 写过controller层、游戏服务器开发
			C++: 游戏客户端开发(cocos2dx)
			</p>

			<h3>
				第三方服务：
			</h3>
			<p> 阿里云: ECS, OSS，视频直播，域名解析, 短信服务</p>
			<p> 支付方案：支付宝、微信 </p>
			<h1>过往项目</h1>
			<v-layout row class="mb-3">
				<v-tooltip top>
					<v-btn small flat color="grey" @click="sortBy('title')" slot="activator">
						<v-icon left small>folder</v-icon>
						<span class="caption text-lowercase">By project name</span>
					</v-btn>
					<span>Sort projects by project name</span>
				</v-tooltip>
				<v-tooltip right>
					<v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
						<v-icon left small>person</v-icon>
						<span class="caption text-lowercase">By person</span>
					</v-btn>
					<span>Srot projects by project person</span>
				</v-tooltip>
			</v-layout>

			<v-card flat v-for="project in projects" :key="project.title">
				<v-layout row wrap :class="`pa-3 project ${project.status}`">
					<v-flex sx12 md6>
						<div class="caption grey--text">Project title</div>
						<div>{{project.title}}</div>
					</v-flex>
					<v-flex xs6 sm4 md2>
						<div class="caption grey--text">Person</div>
						<div>{{project.person}}</div>
					</v-flex>
					<v-flex xs6 sm4 md2>
						<div class="caption grey--text">Due by</div>
						<div>{{project.due}}</div>
					</v-flex>
					<v-flex xs2 sm4 md2>
						<div class="right">
							<v-chip :class="`${project.status} caption my-2`">{{ project.status }}</v-chip>
						</div>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
			</v-card>
		</v-container>
  </section>
</template>

<script>
  import zyicon from '~/assets/image/zylikeIcon.png'
  export default {
		data() {
			return {
        icon: zyicon,
				projects: [
					{ title: 'zylike', person: 'zy', due: '126 Jan 2019', status:'ongoing'},
					{ title: 'website server', person: 'zy', due: '126 Jan 2019', status:'overdue'},
					{ title: 'JumpStart', person: 'babazixun', due: '2018', status:'complete'},
					{ title: 'HongXue/Caishang', person: 'babazixun', due: '2018', status:'complete'},
				]
			};
		},
		methods: {
			sortBy(in_prop) {
				this.projects.sort( (a, b) => a[in_prop] < b[in_prop] ? -1 : 1);
			}
		},
  }
</script>

<style>
.project.complete {
	border-left: 4px solid #3cd1c2;
}
.project.ongoing {
	border-left: 4px solid orange;
}
.project.overdue {
	border-left: 4px solid red;
}
.v-chip.complete {
	background: #3cd1c2;
}
.v-chip.ongoing {
	background: orange;
}
.v-chip.overdue {
	background: red;
}
</style>
