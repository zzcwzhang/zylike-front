<template>
    <v-container>
      <v-layout row justify-center align-center>
        <v-flex sx12 md10>
					<div class="room">
						<component :is="contentComponent" v-model="content" :subfield="false" :toolbarsFlag="false" defaultOpen="preview" />
            </component>
					</div>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
	import { mavonEditor } from 'mavon-editor-uncolor';
	import serverContentShow from '@/components/serverContentShow';

  import _ from 'lodash';
  import axios from 'axios';

  export default {
    name: 'normal',
		created() {
		},
    data() {
      return {
      };
    },
		computed: {
			contentComponent() {
				return process.browser ? mavonEditor : serverContentShow;
			}
		},
    async asyncData({
      params,
      error
    }) {
      const mid = _.get(params, 'mid');
      if (!!mid) {
        const res = await axios.post('https://manage.zylike.com/api/article/normal', {
          mid
        });
        const resdata = res.data;
        if (resdata.success && resdata.data.length > 0) {
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
<style>
	.room {
		position: relative;
		z-index: 4;
	}
</style>
