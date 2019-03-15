<template>
  <section class="recipes">
		<v-layout column justify-center align-center>
			<v-flex xs12 md6>
				<h1 class="grey--text">该页模拟网络延迟1.5秒</h1>
			</v-flex>
			<v-flex xs12 md6>
				<Recipe
					v-for="recipe in recipes"
					:previewText="recipe.previewText"
					:title="recipe.title"
					:id="recipe.id"
					:key="recipe.id"
					:thumbnail="recipe.thumbnail"
					></Recipe>
			</v-flex>
		</v-layout>
  </section>
</template>

<script>
  import Recipe from '@/components/Recipe';
  export default {
		components: {
			Recipe,
		},
    name: '',
		asyncData() {
			return new Promise( (resolve, reject) => {
				setTimeout(() => {
					resolve({
						recipes:[
							{
								id:"1",
								title:"汉堡",
								previewText:"好吃的汉堡",
								thumbnail: "http://img1.imgtn.bdimg.com/it/u=1513496555,2693437190&fm=26&gp=0.jpg",
							},
							{
								id:"2",
								title:"蔬菜",
								previewText:"炒西兰花",
								thumbnail:"http://img5.imgtn.bdimg.com/it/u=1092783629,3964113454&fm=26&gp=0.jpg",
							},
						]
					})
				}, 1500)
			})
		},
		data() {
			return {
			};
		},
  };
</script>

<style scoped>
  .recipes {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: center;
  }

</style>
