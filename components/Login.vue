<template>
  <v-dialog max-width="600px" v-model="dialog">
		<v-avatar size="100" slot="activator">
			<img src="http://oss.zylike.com/images/zhangyuan.png" alt="">
		</v-avatar>
    <v-card>
			<v-card-title>
				<h2>登陆</h2>
			</v-card-title>
			<v-card-text>
				<v-form class="px-3" ref="form">
					<v-text-field label="用户名" v-model="username"></v-text-field>
					<v-text-field label="密码" v-model="password"
																		 @click:append="showp = !showp"
																		 :type="showp ? 'text' : 'password'"
																		 :append-icon="showp ? 'visibility' : 'visibility_off'"
						></v-text-field>
					<v-btn flat class="success mx-0 mt-3" @click="submit">登陆</v-btn>
				</v-form>
			</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: '',
		params: ['showLogin'],
		data() {
			return {
				dialog: false,
				showp: false,
				username: '',
				password: '',
				inputRules: [
					v => v.length >= 3 || '最少输入3个单词',
				]
			}
		},
		methods: {
			submit() {
        const res = this.$axios.post('https://manage.zylike.com/api/user/login', {
					user: this.username,
					pass: this.pass,
				}).then( data => {
					console.log({ data });
				});
			}
		},
  };
</script>

<style scoped>
  # {}
</style>
