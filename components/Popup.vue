<template>
	<v-dialog max-width="600px">
		<v-btn flat slot="activator" class="success">给我留言</v-btn>
		<v-card>
			<v-card-title>
				<h2>留言条</h2>
			</v-card-title>
			<v-card-text>
				<v-form class="px-3">
					<v-text-field label="标题" v-model="title" prepend-icon="folder"></v-text-field>
					<v-textarea label="内容" v-model="content" prepend-icon="edit"></v-textarea>

					<v-menu
						lazy
						fooset-y
						full-width
						ref="menu"
						v-model="menu"
						:return-value.sync="date"
						>
						<template v-slot:activator="{ on }">
							<v-text-field
								v-model="date"
								label="Picker in menu"
								prepend-icon="event"
								readonly
								v-on="on"
								></v-text-field>
						</template>
						<v-date-picker v-model="date" no-title scrollable>
							<v-spacer></v-spacer>
							<v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
							<v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
						</v-date-picker>

					</v-menu>

					<v-btn flat class="success mx-0 mt-3">添加留言</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				title: '',
				content: '',
				date: new Date().toISOString().substr(0, 10),
				menu: false,
			}
		},
		methods: {
			submit() {
				console.log(this.title, this.content);
			}
		}
	};
	</script>

<style scoped>
	# {
	}
</style>

