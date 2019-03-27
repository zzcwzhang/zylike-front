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
	async asyncData() {
		const articles = await axios.get('https://manage.zylike.com/api/article/list').then(res => res.data).then( resdata => resdata.data);
;
		const subjects = await axios.get('https://manage.zylike.com/api/subject/all').then(res => res.data).then( resdata => resdata.data);
		/* console.log({ subjects, articles }); */
		const iconMap = getDict(subjects);
		return { articles, iconMap };
	},
	mounted() {
		if(process.client) {
			const scrollReveal = require('scrollreveal').default;
			console.log(scrollReveal)
			scrollReveal().reveal('.reveal-top', {
				origin: 'bottom',
				reset: false,
				mobile: true,
				distance: '150%',
				opacity: 0,
				rotate: {
					x:20,
					z:20,
				}
			});
		}
	},
	computed: {
		withIcon() {
			const all = _.map(this.articles, (item) => {
				const subjectArray = _.get(item, 'subject');
				if(_.isArray(subjectArray)&&subjectArray.length>0) {
					const subjectArrayLength = subjectArray.length;

					const getIcon = _.get(this.iconMap, item.subject[subjectArrayLength - 1])
					console.log(getIcon);
					item.icon = getIcon || 'icon-404';
				} else {
					item.icon = 'icon-404';
				}
				return item;
			});
			return all;
		},
	},
};
</script>

<style scoped>
</style>
