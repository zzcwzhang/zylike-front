<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-layout column align-center>
        <v-flex class="mt-5">
					<Login :afterLogin="initialArticles"></Login>
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
    <!-- 顶部菜单 -->
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-toolbar-title class="hidden-md-and-down" v-text="title" />
      <v-spacer />
      <!-- 文章查询 -->
      <v-toolbar-items>
        <v-text-field label="查询（标题，标签）" v-model="searchText" append append-icon="search" hide-details single-line v-if="showMenu"></v-text-field>
      </v-toolbar-items>

      <!-- 排序菜单	 -->
      <v-menu offset-y v-if="showMenu">
        <v-btn flat slot="activator" color="grey">
          <v-icon left>expand_more</v-icon>
          <span>排列</span>
        </v-btn>
        <v-list>
          <v-list-tile v-for="link of sortMenu" :key="link.title" @click="setArticlesOrder(link.value)">
            <v-list-tile-action>
              <v-icon v-if="link.value == articlesOrder">done</v-icon>
            </v-list-tile-action>
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
        <v-list-tile v-for="(item, i) in itemsRight" :key="i" router exact>
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
  import Login from '@/components/Login';

  function setupScrollReveal() {
    const scrollReveal = require('scrollreveal').default;
    scrollReveal().reveal('.reveal-top', {
      origin: 'bottom',
      reset: false,
      mobile: true,
      distance: '150%',
      opacity: 0,
      rotate: {
        x: 20,
        z: 20,
      }
    });
  }

  export default {
    components: {
      Popup,
      Login,
    },
    created() {
    },
    async mounted() {
      const env = process.env.NODE_ENV;
      await this.initialData();


      // 设置scrollreveal插件,添加滚动效果
      if (process.client) {
        setupScrollReveal();
      }
    },
    methods: {
      async initialData() {

        const articles = await this.$axios.get('/api/article/list').then(res => res.data).then(resdata => resdata.data);;
        const subjects = await this.$axios.get('/api/subject/all').then(res => res.data).then(resdata => resdata.data);

        this.$store.commit('articles/setList', articles);
        this.$store.commit('articles/setSubjects', subjects);
      },

			async initialArticles() {
        const articles = await this.$axios.get('/api/article/list').then(res => res.data).then(resdata => resdata.data);;
        this.$store.commit('articles/setList', articles);
			},

      setArticlesOrder(in_order) {
        this.$store.commit('articles/setOrder', in_order);
      },
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
      dataWithSearch() {},
      searchText: {
        get() {
          return this.$store.state.articles.searchText;
        },
        set(val) {
          this.$store.commit('articles/setSearchText', val);
        }
      },
      articlesOrder() {
        return this.$store.state.articles.order;
      }
    },
    data() {
      return {
        socket: '',
        clipped: false,
        drawer: false,
        fixed: false,
        sortMenu: [{
            title: '平铺',
            value: 'tile',
          },
          {
            title: '分层',
            value: 'layer',
          },
          // {
          //   title: '所属主题',
          //   value: 'theme',
          // }
        ],
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
          {
            icon: 'code',
            title: '源码(需要翻墙)',
            to: '/inspire'
          },
          {
            icon: 'people',
            title: '昔日团队',
            to: '/team'
          }
        ],
        itemsRight: [{
            title: '百度统计',
            url: 'https://tongji.baidu.com/',
          },
          {
            title: '代码托管gitHub',
            url: 'https://github.com/zzcwzhang/zylike-front'
          },
          {
            title: '日志sentry',
            url: 'https://sentry.io/organizations/indie-developer/issues/?project=1416522&statsPeriod=14d&utc=false'
          },
          {
            title: '自动部署Netlify',
            url: 'https://www.netlify.com/'
          },
          {
            title: '内容管理CMS',
            url: 'https://manage.zylike.com',
          },
          {
            title: '在线编辑',
            url: 'https://codesandbox.io/s/github/zzcwzhang/zylike-front',
          },
          {
            title: '前端框架Vuetify',
            url: 'https://vuetifyjs.com/zh-Hans/',
          },

        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'ZYLIKE.COM'
      }
    },
    watch: {
      '$route.path': function(newValue, oldValue) {

        //记录上一页
        this.$store.commit('__SYS_SET_ROUTE_RECORD', oldValue);

        // 记录来源页的scroll记录
        if (oldValue && document) {
          this.$store.commit('__SYS_SET_SCROLL_RECORD', {
            route: oldValue,
            position: document.documentElement.scrollTop,
          });
        }

      }
    },
    deforeDestroy() {
      // 离开网站时才会触发，而不是离开组件
      this.socket.disconnect();
    },
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
    z-index: 2038;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
  }

  .sysAlert {}

  .fade-enter-active,
  .fade-leave-active {
    transition: all .5s;
  }

  .fade-enter,
  .fade-leave-to

  /* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
