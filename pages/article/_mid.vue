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
		<v-layout column :class="`${isMobile ? 'mobile' : 'pc'}-follow`" style="z-index: 2000">
      <NuxtLink :to="lastRoute">
        <v-btn :small="isMobile" fab>
          <v-icon>arrow_back</v-icon>
        </v-btn>
      </NuxtLink>
      <v-btn fab :small="isMobile" @click="backToTop">
        <v-icon>vertical_align_top</v-icon>
      </v-btn>
    </v-layout>
    <v-layout>
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
      },
			isMobile() {
				const { name:breakpoint } = this.$vuetify.breakpoint;
				if ( breakpoint == 'xs' || breakpoint == 'sm') {
					return true;
				} else {
					return false;
				}
			},
			lastRoute() {
				return this.$store.state.last_route;
			},
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
        if (process.client) {
          document.documentElement.scrollTop = 0
					const _hmt = window._hmt || [];
					_hmt.push(['_trackEvent', 'scrollTop', 'click' ]);
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

  .pc-follow {
    position: fixed;
    top: 80px;
    right: 9px;
  }

  .mobile-follow {
    position: fixed;
    bottom: 30px;
    right: 9px;
  }

  a {
    text-decoration: none;
  }

  .top-back {
    position: fixed;
    top: 10vh;
    right: 60px;
  }
</style>
