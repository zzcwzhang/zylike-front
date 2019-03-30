# COMPONENTS

**This directory is not required, you can delete it if you don't want to use it.**

The components directory contains your Vue.js Components.

_Nuxt.js doesn't supercharge these components._

```vue
// 加载记录的scroll数
const slist = this.$store.state.scroll_record;
const tag = _.find(slist, item => item.route == this.$route.name); 
if(tag) {
const { position = 0 } = tag;
document.documentElement.scrollTop = position;
}
```
