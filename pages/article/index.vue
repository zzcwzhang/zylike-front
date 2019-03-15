<template>
  <div>
    <h1>Article</h1>
    <v-layout column justify-center align-center>
      <v-flex xs12 md6 lg4>
        <v-hover v-for="md in topTen" :key="md.mid">
					<v-card slot-scope="{ hover }" :class="`mb-3 elevation-${hover ? 12 : 2}`" >
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
