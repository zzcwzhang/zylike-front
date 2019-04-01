<template>
	<div>
		<v-container class="my-5">
			<v-layout row wrap>
				<v-flex
					v-for="md in withIcon"
					:key="md.mid"
					class="reveal-top"
					xs12 sm6 md6 lg4>
					<article-title :md="md"></article-title>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
import axios from 'axios';
import ArticleTitle from '@/components/ArticleTitle';
import _ from 'lodash';


function getDict(in_subjects) {
	const tree = _.cloneDeep(in_subjects);
	const dict = {};
	const walkTree = (t_node) => {
		const { label = '', value = '', children = [] } = t_node;
		if(label!=''&&value!='') {
			dict[label] = value;
		}
		if ( _.isArray(children) && children.length > 0 ) {
			_.forEach(children, (item) => {
				walkTree(item);
			})
		} 
	}
	_.forEach(tree, (item) => {
		walkTree(item);
	})
	return dict;
}

export default {
	name: 'article',
	components: {
		ArticleTitle,
	},
	// 留作参考
	// async asyncData({ $axios }) {
//     const articles = await $axios.get('/api/article/list').then(res => res.data).then( resdata => resdata.data);
// ;
//     const subjects = await $axios.get('/api/subject/all').then(res => res.data).then( resdata => resdata.data);
//     const iconMap = getDict(subjects);
//     return { articles, iconMap };
	// },
	mounted() {
		// 读取上次滚动位置
		if(process.client) {
			const slist = this.$store.state.scroll_record;
			const tag = _.find(slist, item => item.route == this.$route.path); 
			if(tag) {
				const { position = 0 } = tag;
				if(position > 0) {
					// 必须有延迟
					setTimeout(() => {
						document.documentElement.scrollTop = position;
					}, 300);
				}
			}
		}
	},
	computed: {
		withIcon() {
			return this.$store.getters['articles/getArticlesWithIcon'];
		},
	},
};
</script>

<style scoped>
</style>
