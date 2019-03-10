<template>
  <nuxt-link :to="'/recipes/' + id">
    <article class="recipe">
      <div class="thumbnail" :style="{ backgroundImage: `url(${thumbnail})` }">
      </div>
      <h1>{{ title }}</h1>
      <p>{{ previewText }}</p>
    </article>
  </nuxt-link>
</template>

<script>
  export default {
    props: ['thumbnail', 'title', 'previewText', 'id'],

  }
</script>
<style scoped>
a{
	text-decoration: none;
	color: #fff;
}
  .recipe {
    box-sizing: border-box;
    width: 280px;
    padding: 8px;
    border: 1px solid #fdfdfd;
    box-shadow: 0 2px 2px #fff;
    margin: 10px;
  }

  .thumbnail {
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 200px;

  }
</style>
