<template>
  <div>
    <v-container>
      <v-layout row justify-center align-center>
        <v-flex sx12 md8 lg6>
          <div>
            {{content}}
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import _ from 'lodash';
  import axios from 'axios';
  export default {
    name: 'normal',
    mounted() {},
    async asyncData({
      params,
      error
    }) {
      console.log({
        error,
        params
      })
      const mid = _.get(params, 'mid');
      if (!!mid) {
				const res = await axios.post('https://manage.zylike.com/api/article/normal', { mid });
        const {
          success
        } = res.data;
				if (success&&res.data.length>0) {
          const {
            data
          } = res.data;
          return data[0];
        } else {
          const {
            info
          } = res.data;
					return {
						content: '未查到该文档',
					};
        }
      } else {
        return {
          content: 'not found mid',
        }
      }
    },
  };
</script>
