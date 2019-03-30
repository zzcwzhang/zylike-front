export const state = () => ({
	sys_alert: false,
	sys_alert_content: {
		info: '',
		type: 'success',
	},
	last_route: '',
})

export const mutations = {
	__SYS_ALERT_SET(state, onoff) {
		state.sys_alert = onoff;
	},
	__SYS_ALERT_COMMENT(state, content) {
		state.sys_alert_content = content;
	},
	__SYS_SET_ROUTE_RECORD(state, route) {
		state.last_route = route;
	},
}

const wait = (second) => new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve();
	}, second * 1000);
})



export const actions = {
	async sysAlert({
		commit
	}, content) {
		const {
			info = '', type = 'success'
		} = content;
		if (!info) {
			console.error('system alert format error! need Object with propert info and type');
		} else {
			commit('__SYS_ALERT_SET', true);
			commit('__SYS_ALERT_COMMENT', { info, type } );
			await wait(2);
			commit('__SYS_ALERT_SET', false);
			commit('__SYS_ALERT_COMMENT', '');
		}
	}
}
