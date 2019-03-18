<template>
	<div>
		<h1 class="subheading grey--text">Article</h1>
		<v-container class="my-5">
			<v-layout row wrap>
				<v-flex
					v-for="md in topTen"
					:key="md.mid"
					xs12 sm6 md6 lg4>
					<ArticleTitle :md="md"></ArticleTitle>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
import axios from 'axios';
import ArticleTitle from '@/components/ArticleTitle';
import _ from 'lodash';


export default {
	name: 'article',
	components: {
		ArticleTitle,
	},
	async asyncData() {
		const res = await axios.get('https://manage.zylike.com/api/article/list');
		const resdata = res.data;
		const data = resdata.data;
		return resdata;
	},
	computed: {
		topTen() {
			/* return _.slice(this.data, 0, 10); */
			return this.data;
		},
	},
};
</script>

<style scoped>
</style>
