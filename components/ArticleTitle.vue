<template>
  <nuxt-link :to="`/article/${md.mid}`">
    <v-hover>
      <v-card slot-scope="{ hover }" :class="`ma-3 elevation-${hover ? 12 : 2}`">
        <v-layout wrap row>
					<v-flex xs12 md4 class="text-lg-center pa-2" v-if="md.icon!=''">
						<svg class="icon" aria-hidden="true">
							<use :xlink:href="`#${md.icon}`"></use>
						</svg>
					</v-flex>
					<v-flex xs8>
						<v-card-title primary-title>
							<div>
								<p class="title mb-0">{{md.title}}</p>
								<p class="caption">更新于：{{ fromNow(md.updateTime)}}</p>
								<p class="caption">创建于：{{ formatTime(md.createTime)}}</p>
							</div>
						</v-card-title>
					</v-flex>
        </v-layout>
      </v-card>
    </v-hover>
  </nuxt-link>
</template>

<script>
  import moment from 'moment';
  moment.locale('zh-cn');
  export default {
    name: '',
    props: ['md'],
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
  .icon {
    width: 90%;
    height: auto;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  a {
    text-decoration: none;
  }
</style>
