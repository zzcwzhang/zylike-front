<template>
  <div>
    <v-timeline>
      <v-timeline-item v-for="md in withIcon" :key="md.mid" large color="white">
        <template v-slot:icon>
          <v-avatar size="30">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`#${md.icon}`"></use>
            </svg>
          </v-avatar>
        </template>
        <template v-slot:opposite>
          <span>{{ formatTime( md.createTime ) }}</span>
        </template>
        <nuxt-link :to="`/article/${md.mid}`">
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 3}`">
              <v-card-title class="headline">{{ md.title }}</v-card-title>
              <v-card-text>
                <p>更新于：{{ fromNow(md.updateTime)}}</p>
              </v-card-text>
            </v-card>
          </v-hover>
        </nuxt-link>


      </v-timeline-item>

    </v-timeline>
  </div>
</template>

<script>
  import moment from 'moment';
	import _ from 'lodash';
  moment.locale('zh-cn');

  import axios from 'axios';
  import ArticleTitle from '@/components/ArticleTitle';

  export default {
    name: 'article',
    components: {
      ArticleTitle,
    },
    methods: {
      fromNow(in_time) {
        return moment(in_time).fromNow();
      },
      formatTime(in_time) {
        return moment(in_time).format('YYYY年MM月DD日 HH:ss:mm');
      }
    },
    computed: {
      withIcon() {
        const clist = this.$store.getters['articles/getArticlesWithIcon'];
				return _.sortBy(clist, (item) => {
					return item.createTime;
				})
      },
    },
  };
</script>

<style scoped>
</style>
