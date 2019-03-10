<template>
  <v-layout column justify-center align-center>
		<v-flex  xs12 sm8 md6 d-flex>
			<img :src="icon" alt="">
		</v-flex>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">欢迎来到我的小站</v-card-title>
        <v-card-text>
          <p>新版前端正在建设中，因为前期考虑不周，导致旧版无法实现一些功，包括SEO、热力追踪、手机端适配等，所以不得不重构网站，敬请期待！</p>
          <p>旧版连接(最好不要用手机浏览): <a href="http:manage.zylike.com">http//:manage.zylike.com</a></p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import zyicon from '~/assets/image/zylikeIcon.png'
  import axios from 'axios'
  import VuetifyLogo from '~/components/VuetifyLogo.vue'

  export default {
    asyncData() {},
    async fetch() {
      /* await axios.get("http://manage.zylike.com/api/subject/all").then(res => res.data) */
      /*   .then(resdata => { */
      /*     const { */
      /*       data */
      /*     } = resdata; */
      /*     console.log({ */
      /*       data */
      /*     }) */
      /*   }) */
    },
    /* head() { */
    /*   return { */
    /*     title: 'zylike个人小站', */
    /*     meta: [{ */
    /*       hid: 'description', */
    /*       name: 'description', */
    /*       content: '这是一个充满乐趣，刺激，潮流的技术网站' */
    /*     }] */
    /*   } */
    /* }, */
    data() {
      return {
        icon: zyicon,
      }
    },
    components: {
      Logo,
      VuetifyLogo
    }
  }
</script>
