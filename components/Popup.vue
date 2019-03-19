<template>
	<v-dialog max-width="600px" v-model="dialog">
		<v-btn flat slot="activator" class="success">给我留言</v-btn>
		<v-card>
			<v-card-title>
				<h2>留言条</h2>
			</v-card-title>
			<v-card-text>
				<v-form class="px-3" ref="form">
					<v-text-field label="标题" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
					<v-textarea label="内容" v-model="content" prepend-icon="edit" :rules="inputRules"></v-textarea>
					<v-text-field label="联系方式" v-model="contactWay" prepend-icon="question_answer" :rules="inputRules"></v-text-field>

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

					<v-btn :loading="loading" flat class="success mx-0 mt-3" @click="submit">添加留言</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
  import axios from 'axios'
	export default {
		name: '',
		data() {
			return {
				title: '',
				content: '',
				date: new Date().toISOString().substr(0, 10),
				menu: false,
				contactWay: '',
				inputRules: [
					v => v.length >= 3 || '最少输入3个单词',
				],
					loading: false,
					dialog: true,
			}
		},
		methods: {
			submit() {
				this.loading = true;
				const fm = this.$refs.form;
				if(fm.validate()) {
					axios.post('https://manage.zylike.com/api/comment/save', {
						tagName: this.title,
						content: this.content,
						contactWay: this.contactWay,
					}).then( res => res.data).then (resdata => {
						console.log(resdata);
						if(resdata.success) {
							this.loading = false;
							this.dialog = false;
						}
					});
				} else {
					console.log('no validate')
				}
			}
		}
	};
	</script>

<style scoped>
	# {
	}
</style>

