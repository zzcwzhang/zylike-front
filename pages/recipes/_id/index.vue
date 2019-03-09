<template>
	<section class="single-recipe">
		<h1>{{recipe.title}}</h1>
		<div>
			<img :src="recipe.thumbnail" alt="">
		</div>
		<p>{{  recipe.previewText  }}</p>
	</section>
</template>
<script>
export default {
	asyncData(context) {
			return new Promise( (resolve, reject) => {
				setTimeout(() => {
					resolve({
						recipe:[
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
						].find(el => el.id == context.params.id)
					})
				}, 1500)
			})
	},
}
</script>
<style scoped>
.single-recipe {
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-content: center;
	justify-content: center;
	text-align: center;
	padding: 30px;
}
.recipe-image {
	width: 100%;

}
</style>
