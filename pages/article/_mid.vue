<template>
  <div>
    <v-container>
      <v-layout row justify-center align-center>
        <v-flex sx12 md10>
          <v-card>
            <mavon-editor v-model="content" :subfield="false" :toolbarsFlag="false" defaultOpen="preview" />
            </mavon-editor>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {
    mavonEditor
  } from 'mavon-editor-uncolor';
  /* import 'mavon-editor/dist/css/index.css'; */

  import _ from 'lodash';
  import axios from 'axios';
  export default {
    name: 'normal',
    components: {
      mavonEditor,
    },
    data() {
      return {
      };
    },
    mounted() {},
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
  .v-note-wrapper {
    background: #30303 !important;
  }

  .markdown-body {
    background: #30303 !important;
  }
</style>
