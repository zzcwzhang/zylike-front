<template>
	<div>
		<v-container class="my-5">
			<v-layout row wrap v-if="order == 'tile'">
				<v-flex
					v-for="md in withIcon"
					:key="md.mid"
					class="reveal-top"
					xs12 sm6 md6 lg4>
					<article-title :md="md"></article-title>
				</v-flex>
			</v-layout>
			<v-layout row wrap v-if="order == 'layer'">
				<v-treeview
					:items="layerData"
					item-text="label"
					activatable
					v-model="selectItem"
					open-on-click
					item-key="label"
					>
					<template v-slot:label="{item}">
						<nuxt-link v-if="item['mid']" :to="`/article/${item.mid}`">
							<span>{{ item.label  }}</span>
						</nuxt-link>
						<span v-else>{{ item.label  }}</span>
					</template>
					<template v-slot:prepend="{ item }">
						<v-avatar size="16" v-if="item.icon!=''">
							<svg class="icon" aria-hidden="true">
								<use :xlink:href="`#${item.value}`"></use>
							</svg>
          </v-avatar>
        </template>
				</v-treeview>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
import ArticleTitle from '@/components/ArticleTitle';
import _ from 'lodash';

export default {
	name: 'article',
	components: {
		ArticleTitle,
	},
	data() {
		return {
			selectItem: [],
		}
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
		order() {
			return this.$store.state.articles.order;
		},
		layerData() {
			return this.$store.getters['articles/getArticlesByTheme'];
		},
	},
};
</script>

<style scoped>
</style>
