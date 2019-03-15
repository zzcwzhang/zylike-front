<template>
	<div>
		<h1 class="subheading grey--text">Article</h1>
		<v-container class="my-5">
			<v-layout row wrap>
				<v-flex
					v-for="md in topTen"
					:key="md.mid"
					xs12 sm6 md6 lg4>
					<v-hover>
						<v-card
							slot-scope="{ hover }"
							:class="`ma-3 elevation-${hover ? 12 : 2}`"
							>
							<v-card-title primary-title>
								<div>
									<h3 class="headline mb-0">{{md.title}}</h3>
									<p>更新于：{{ fromNow(md.updateTime)}}</p>
									<p>创建于：{{ formatTime(md.createTime)}}</p>
								</div>
							</v-card-title>
						</v-card>
					</v-hover>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
moment.locale('zh-cn');
export default {
	name: 'article',
	async asyncData() {
		const res = await axios.get('http://manage.zylike.com/api/article/list');
		const resdata = res.data;
		const data = resdata.data;
		return resdata;
	},
	computed: {
		topTen() {
			return _.slice(this.data, 0, 10);
		},
	},
	methods: {
		fromNow(in_time) {
			return moment(in_time).fromNow();
		},
		formatTime(in_time) {
			return moment(in_time).format('YYYY年MM月DD日');
		}
	}
};
</script>

<style scoped>
</style>
