<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-xs-center">
				<v-card flat tile d-flex>
					<v-img aspect-ratio="1" :src="icon" alt="图标"/>
				</v-card>
      </div>
      <v-card>
        <v-card-title class="headline">欢迎来到我的小站</v-card-title>
        <v-card-text>
          <p>新版前端正在建设中，因为前期考虑不周，导致旧版无法实现一些功，包括SEO、热力追踪、手机端适配等，所以不得不重构网站，敬请期待！</p>
          <p>旧版连接<a href="http:manage.zylike.com">http//:manage.zylike.com</a></p>
          <div class="text-xs-right">
            <em><small>&mdash;zhangYuan</small></em>
          </div>
          <hr class="my-3">
          <a
            href="https://nuxtjs.org/"
            target="_blank"
          >Nuxt Documentation</a>
          <br>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
          >Nuxt GitHub</a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            nuxt
            to="/inspire"
          >Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import zyicon from '~/assets/image/zyicon.png'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
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
