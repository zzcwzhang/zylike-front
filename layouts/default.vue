<template>
  <v-app dark>
    <v-navigation-drawer
		 	v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/avatar/zhangyuan.png" alt="">
          </v-avatar>
        </v-flex>
        <p class="subheading mt-1">Zhang Yuan</p>
        <v-flex class="mt-4 mb-3">
          <Popup></Popup>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
			<!-- <v-btn icon @click.stop="console.log('ok')" v-if="inArticle"> -->
			<!--   <v-icon>{{ `chevron_left` }}</v-icon> -->
			<!-- </v-btn> -->
      <!-- <v-btn icon @click.stop="clipped = !clipped"> -->
      <!--   <v-icon>web</v-icon> -->
      <!-- </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed"> -->
      <!--   <v-icon>remove</v-icon> -->
      <!-- </v-btn> -->
      <v-toolbar-title v-text="title" />

      <v-spacer />

      <!-- <v-menu offset-y> -->
      <!--   <template v-slot:activator="{ on }"> -->
      <!--     <v-btn -->
      <!--       color="primary" -->
      <!--       dark -->
      <!--       v-on="on" -->
      <!--       > -->
      <!--       Dropdown -->
      <!--     </v-btn> -->
      <!--   </template> -->
      <!--   <v-list> -->
      <!--     <v-list-tile -->
      <!--       v-for="(item, index) in items" -->
      <!--       :key="index" -->
      <!--       @click="" -->
      <!--       > -->
      <!--       <v-list-tile-title>{{ item.title }}</v-list-tile-title> -->
      <!--     </v-list-tile> -->
      <!--   </v-list> -->
      <!-- </v-menu> -->

      <v-menu offset-y v-if="showMenu">
        <v-btn flat slot="activator" color="grey">
          <v-icon left>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
        <v-list>
          <v-list-tile v-for="link of items" :key="link.title" router :to="link.to">
            <v-list-tile-title>{{ link.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
				<v-list-tile>
						<v-list-tile-title>工具箱</v-list-tile-title>
				</v-list-tile>
        <v-list-tile v-for="(item, i) in itemsRight" :key="i"  router exact>
          <v-list-tile-action>
            <v-icon light>code</v-icon>
          </v-list-tile-action>
					<a :href="item.url" target="_blank">
						<v-list-tile-title>{{item.title}}</v-list-tile-title>
					</a>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
		<transition name="fade">
		<div class="sysAlertRoom" v-if="sysAlert">
			<v-alert :value="sysAlert" :type="sysAlertContent.type">
				{{sysAlertContent.info}}
			</v-alert>
		</div>
		</transition>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Popup from '@/components/Popup';
  export default {
    components: {
      Popup,
    },
		computed: {
			sysAlert() {
				return this.$store.state.sys_alert;
			},
			sysAlertContent() {
				return this.$store.state.sys_alert_content;
			},
			showMenu() {
				return this.$route.name == 'index';
			},
			inArticle() {
				return this.$route.name == 'article-mid';
			},
		},
    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [{
            icon: 'apps',
            title: '首页',
            to: '/'
          },
          {
            icon: 'reorder',
            title: '归档',
            to: '/article'
          },
          {
            icon: 'accessibility',
            title: '关于我',
            to: '/about'
          },
          /* { */
          /*   icon: 'dashboard', */
          /*   title: 'Recipes', */
          /*   to: '/recipes' */
          /* }, */
          {
            icon: 'people',
            title: '昔日团队',
            to: '/team'
          }
        ],
				itemsRight: [
					{
						title: 'localhost:3000',
						url:'http://localhost:3000',
					},
					{
						title: 'localhost:8083',
						url:'http://localhost:8083'
					},
					{
						title: 'CMS',
						url: 'https://manage.zylike.com',
					},
					{
						title: '百度一下',
						url: 'https://www.baidu.com',
					},
					{
						title: '英语学习',
						url: 'https://www.quora.com/',
					},

				],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'ZYLIKE.COM'
      }
    }
  }
</script>
<style>
  * {
    box-sizing: border-box;
  }

  .cfont_kuaile {
    font-family: 'ZCOOL KuaiLe', cursive, sans-serif;
  }
	.sysAlertRoom {
		display: flex;
		flex-direction: row;
		align-content: center;
		justify-content: center;
		z-index:2038;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
	}
	.sysAlert {
	}
	.fade-enter-active, .fade-leave-active {
		transition: all .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
		transform: translateY(30px);
	}
</style>
