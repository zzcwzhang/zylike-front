<template>
		<div id="team">
			<h1 class="subheading grey--text">Team</h1>
			<v-container class="my-5">
				<v-layout row wrap>
					<v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
						<v-card class="text-xs-center ma-3">
							<v-responsive class="pt-4">
								<v-avatar size="100" class="grey lighten-2">
									<img :src="person.avatar" alt="">
								</v-avatar>
							</v-responsive>
							<v-card-text class="subheading">
								<div class="subheading"> {{ person.name }} </div>
								<div class="grey--text">{{ person.role }}</div>
							</v-card-text>
							<v-card-actions>
								<v-btn flat color="grey">
									<v-icon small left>message</v-icon>
									<span>MESSAGE</span>
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>
					<v-flex xs12a sm6 md6>
						<v-card class="text-xs-center ma-3">
							<v-responsive class="pt-4">
									<img contain height="125px" src="/avatar/yunwei.png">
							</v-responsive>
							<v-card-text class="subheading">
								<div class="subheading">  特别感谢运维组的队员们  </div>
								<div class="grey--text"> 依次为祁子昂，孟翔飞, 鹿文庆，王松,没有你们开发组无法正常工作</div>
							</v-card-text>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</div>
</template>

<script>
	export default {
		name: 'team',
		data() {
			return {
				team: [
					{ name: '张远', role: 'Front End Architect', avatar: '/avatar/zhangyuan.png', intro: ''},
					{ name: '邹瑜', role: 'After End Architect', avatar: '/avatar/zouyu.png', intro: ''},
					{ name: '刘志', role: 'Project Manager', avatar: '/avatar/lz.png', intro: ''},
					{ name: '张海静', role: 'Disigner', avatar: '/avatar/zhj.png', intro: ''},
					{ name: '牛小东', role: 'Operator', avatar: '/avatar/nxd.png', intro: ''},
					{ name: '牛犇', role: 'Web developer', avatar: '/avatar/nb.png', intro: ''},
					{ name: '龚涛', role: 'Disigner', avatar: '/avatar/gt.png', intro: ''},
					{ name: '王彦森', role: 'IOS developer', avatar: '/avatar/wys.png', intro: ''},
					{ name: '周超', role: 'Java developer', avatar: '/avatar/zhouchao.png', intro: ''},
					{ name: '胡皎月', role: 'Web developer', avatar: '/avatar/hjy.png', intro: ''},
				]
			}
		}
	};
	</script>

<style scoped>
	#team {
	}
</style>

