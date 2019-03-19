<template>
  <v-container>
    <v-layout row justify-center align-center>
      <v-flex sx12 md10>
        <div class="room">
          <component ref="test" :is="contentComponent" v-model="content" :subfield="false" :toolbarsFlag="false" defaultOpen="preview" />
          </component>
        </div>
      </v-flex>
    </v-layout>
    <v-layout column class="follow" style="z-index: 2000">
      <v-btn small fab @click="backToTop">
        <v-icon>vertical_align_top</v-icon>
      </v-btn>
      <NuxtLink to="/article">
        <v-btn small fab>
          <v-icon>reply</v-icon>
        </v-btn>
      </NuxtLink>
    </v-layout>
  </v-container>
</template>

<script>
  import {
    mavonEditor
  } from 'mavon-editor-uncolor';
  import serverContentShow from '@/components/serverContentShow';

  import _ from 'lodash';
  import axios from 'axios';

  export default {
    name: 'normal',
    created() {},
    data() {
      return {
				/* step: 50, */
			};
    },
    computed: {
      contentComponent() {
        return process.browser ? mavonEditor : serverContentShow;
      }
    },
    head() {
      return {
        title: this.title,
        meta: [{
          hid: 'description',
          name: 'description',
          content: this.tags.join(','),
        }]
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
    methods: {
      backToTop() {
        if ( process.client ) {
					document.documentElement.scrollTop = 0
					return;
        }
      }
    }
  };
</script>
<style>
  .room {
    position: relative;
    z-index: 1;
		padding-bottom: 30vh;
  }

  .follow {
    position: fixed;
    bottom: 30px;
    right: 9px;
  }

  a {
    text-decoration: none;
  }
</style>
