<template>
  <nuxt-link :to="`/article/${mid}`">
    <v-hover>
      <v-card slot-scope="{ hover }" :class="`ma-3 elevation-${hover ? 12 : 2}`">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{md.title}}</h3>
            <p>更新于：{{ fromNow(md.updateTime)}}</p>
            <p>创建于：{{ formatTime(md.createTime)}}</p>
          </div>
        </v-card-title>
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
a{
	text-decoration: none;
}
</style>
