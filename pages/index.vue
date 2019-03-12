<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 lg4 xl4 d-flex>
      <img :src="icon" alt="">
    </v-flex>
    <v-flex xs12 sm8 md6 lg4 xl4 d-flex>
      <v-card>
        <v-card-title class="headline">欢迎来到我的小站</v-card-title>
        <v-card-text>
          <p>新版前端正在建设中，因为前期考虑不周，导致旧版无法实现一些功，包括SEO、热力追踪、手机端适配等，所以不得不重构网站，敬请期待！</p>
          <p>本站使用的技术在YouTube上 <a href="https://www.youtube.com/watch?v=Dc_5BpIB4X4&index=1&list=PL55RiY5tL51pk1RvaQOxI6sJ-yZzExzJn" target="_blank">https://www.youtube.com/watch?v=Dc_5BpIB4X4&index=1&list=PL55RiY5tL51pk1RvaQOxI6sJ-yZzExzJn</a>学得，有兴趣的朋友可以去看源视频教程</p>
					<p class="purple blue--text text--lighten-1">目前该网站可能乱七八糟，一塌糊涂，因为我正拿他做练习^_^ </p>
          <p class="pink lighten-4 red--text text--darken-4">旧版连接(最好不要用手机浏览): <a href="http:manage.zylike.com">http//:manage.zylike.com</a></p>
					<v-btn class="hidden-md-and-down">
						hidden-md-and-down
					</v-btn>
					<v-btn class="hidden-md-and-up">
						hidden-md-and-up
					</v-btn>
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
        posts: [{
            title: 'A new Beginning',
            previewText: 'This will be awesome, dont\'t miss it!',
            thumbnailUrl: '',
            id: 'a-new-beginning',
          },
          {
            title: 'A Second Beginning',
            previewText: 'This will be awesome, dont\'t miss it!',
            thumbnailUrl: '',
            id: 'a-second-beginning',
          },
        ]
      }
    },
    components: {
      Logo,
      VuetifyLogo
    }
  }
</script>
