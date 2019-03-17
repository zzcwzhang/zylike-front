<template>
  <div>
    <v-container>
      <v-layout row justify-center align-center>
        <v-flex sx12 md8 lg6>
          <div>
						<mavon-editor v-model="content" :subfield="false" :toolbarsFlag="false" defaultOpen="preview" />
							</mavon-editor>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
	import { mavonEditor } from 'mavon-editor';
	/* import 'mavon-editor/dist/css/index.css'; */

  import _ from 'lodash';
  import axios from 'axios';
  export default {
    name: 'normal',
		components: {
			mavonEditor,
		},
    mounted() {},
    async asyncData({
      params,
      error
    }) {
      const mid = _.get(params, 'mid');
      if (!!mid) {
				const res = await axios.post('https://manage.zylike.com/api/article/normal', { mid });
				const resdata = res.data;
				if (resdata.success&&resdata.data.length > 0) {
          return resdata.data[0];
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

<style scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>
