<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">匿名聊天</v-btn>
    <v-card>
      <v-card-title>
        <h2>匿名聊天</h2>
      </v-card-title>
      <v-card-text>
				<p v-if="mlist.length > 0" v-for="m in mlist" :key="m">{{m}}</p>
        <v-form class="px-3" ref="form">
          <v-text-field label="内容" v-model="message" prepend-icon="folder" :rules="inputRules"></v-text-field>
          <v-btn :loading="loading" flat class="success mx-0 mt-3" @click="submit">发送</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import io from 'socket.io-client'
  export default {
    name: '',
    data() {
      return {
        mlist: [],
        socket: null,
        message: '',
        inputRules: [
          v => v.length >= 1 || '最少输入1个单词',
        ],
        loading: false,
        dialog: false,
      }
    },
    watch: {
      dialog(nv, ov) {
        console.log(nv);
        if (nv) {
          this.openSocket();
        } else {
					this.closeSocket();
				}
      },
    },
    methods: {
      openSocket() {
        /* // 加载IO通信 */
        if (!!process.env.IO_URL) {
          this.socket = io(process.env.IO_URL);
          this.socket.on('chat', (data) => {
            this.loading = false;
						const { mode, message } = data;
						// 根据不同模式处理不同方式
						if( mode == 'append') {
							this.mlist.push(message);
						} else if ( mode == 'refresh' ) {
							this.mlist = message;
						} else {
							throw new Error('unexpect chat room mode');
						}
          })
          this.socket.on('chat_init', (data) => {
            this.loading = false;
						this.mlist = data.list;
          })
        }
      },
			closeSocket() {
				this.socket.disconnect();
				this.socket = null;
			},
      submit() {
        this.loading = true;
        const fm = this.$refs.form;
        if (fm.validate()) {
          this.socket.emit('message', {
            message: this.message
          });
        } else {
          console.log('no validate')
        }
      },
    }
  };
</script>

<style scoped>
  # {}
</style>
