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
					{ name: '张远', role: 'Web developer', avatar: '/avatar/zhangyuan.png', intro: ''},
					{ name: '刘志', role: 'Web developer', avatar: '/avatar/lz.png', intro: ''},
					{ name: '张海静', role: 'Web developer', avatar: '/avatar/zhj.png', intro: ''},
					{ name: '牛小东', role: 'Web developer', avatar: '/avatar/nxd.png', intro: ''},
					{ name: '牛犇', role: 'Web developer', avatar: '/avatar/nb.png', intro: ''},
					{ name: '龚涛', role: 'Web developer', avatar: '/avatar/gt.png', intro: ''},
					{ name: '王彦森', role: 'Web developer', avatar: '/avatar/wys.png', intro: ''},
					{ name: '邹瑜', role: 'Web developer', avatar: '/avatar/zouyu.png', intro: ''},
					{ name: '胡皎月', role: 'Web developer', avatar: '/avatar/zhouchao.png', intro: ''},
					/* { name: '运维组', role: 'Web developer', avatar: '/avatar/zhouchao.png', intro: ''}, */
				]
			}
		}
	};
	</script>

<style scoped>
	#team {
	}
</style>

