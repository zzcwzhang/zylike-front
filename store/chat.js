import _ from 'lodash';

export const state = () => ({
	/*文章列表*/
	mlist: [],
	loading: false,
	socket: '',
})

export const mutations = {
	setList(state, in_list) {
		state.mlist = in_list;
	},

	sendMessage(state, in_message) {
		state.socket.emit('message', {
			content: in_message,
		})
	},
}
