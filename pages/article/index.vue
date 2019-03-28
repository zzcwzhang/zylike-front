<template>
  <div>
    <v-timeline>
      <v-timeline-item v-for="md in withIcon" :key="md.mid" large color="white">
        <template v-slot:icon>
          <v-avatar size="30">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`#${md.icon}`"></use>
            </svg>
          </v-avatar>
        </template>
        <template v-slot:opposite>
          <span>{{ formatTime( md.createTime ) }}</span>
        </template>
        <nuxt-link :to="`/article/${md.mid}`">
          <v-hover>
            <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 3}`">
              <v-card-title class="headline">{{ md.title }}</v-card-title>
              <v-card-text>
                <p>更新于：{{ fromNow(md.updateTime)}}</p>
              </v-card-text>
            </v-card>
          </v-hover>
        </nuxt-link>


      </v-timeline-item>

    </v-timeline>
  </div>
</template>

<script>
  import moment from 'moment';
  moment.locale('zh-cn');

  import axios from 'axios';
  import ArticleTitle from '@/components/ArticleTitle';
  import _ from 'lodash';


  function getDict(in_subjects) {
    const tree = _.cloneDeep(in_subjects);
    const dict = {};
    const walkTree = (t_node) => {
      const {
        label = '', value = '', children = []
      } = t_node;
      if (label != '' && value != '') {
        dict[label] = value;
      }
      if (_.isArray(children) && children.length > 0) {
        _.forEach(children, (item) => {
          walkTree(item);
        })
      }
    }
    _.forEach(tree, (item) => {
      walkTree(item);
    })
    return dict;
  }

  export default {
    name: 'article',
    components: {
      ArticleTitle,
    },
    async asyncData() {
      const articles = await axios.get('https://manage.zylike.com/api/article/list').then(res => res.data).then(resdata => resdata.data);;
      const subjects = await axios.get('https://manage.zylike.com/api/subject/all').then(res => res.data).then(resdata => resdata.data);
      const iconMap = getDict(subjects);
      return {
        articles,
        iconMap
      };
    },
    methods: {
      fromNow(in_time) {
        return moment(in_time).fromNow();
      },
      formatTime(in_time) {
        return moment(in_time).format('YYYY年MM月DD日 HH:ss:mm');
      }
    },
    computed: {
      withIcon() {
        const all = _.map(this.articles, (item) => {
          const subjectArray = _.get(item, 'subject');
          if (_.isArray(subjectArray) && subjectArray.length > 0) {
            const subjectArrayLength = subjectArray.length;

            const getIcon = _.get(this.iconMap, item.subject[subjectArrayLength - 1])
            item.icon = getIcon || 'icon-404';
          } else {
            item.icon = 'icon-404';
          }
          return item;
        });
        return all;
      },
    },
  };
</script>

<style scoped>
</style>
