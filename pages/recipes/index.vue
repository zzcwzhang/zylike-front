<template>
  <section class="recipes">
		<Recipe
			v-for="recipe in recipes"
			:previewText="recipe.previewText"
			:title="recipe.title"
			:id="recipe.id"
			:key="recipe.id"
			:thumbnail="recipe.thumbnail"
			></Recipe>
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
