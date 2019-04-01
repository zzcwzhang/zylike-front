// ==============================
// 使用方式
// ==============================
// ==============================
// post 实例
// ==============================
/* this.fetch({ */
/*   url: 'user/login', */
/*   method: 'post', */
/*   data: { */
/*     user: this.user, */
/*     pass: this.pass, */
/*   }, */
/* }).then( data => { */
/*   this.loginVisible = false; */
/* }).catch(err=> { */
/*   this.loginVisible = false; */
/* }) */
// ==============================
// get 实例 ?param1=a&param2=b方式
// ==============================
/* this.fetch({ */
/*   url: 'user/test', */
/*   params: { */
/*     tet1: 'tes2' */
/*   }, */
/* }).then(res => { */
/*   console.log('new fetch') */
/* }) */
// ==============================
// get 实例 简单方式
// ==============================
 /* this.fetch('user/test/aaa/bbb').then(res => { */
 /*   console.log('new fetch') */
 /* }) */

import axios from 'axios';
import _ from 'lodash';
import Vue from 'vue'

const service = axios.create({
	baseURL: 'https://manage.zylike.com',
	timeout: 3000, // 3秒超时
	withCredentials: true, // 允许携带cookie
})

service.interceptors.response.use(
	response => {
		try {
			const {success, info, data} = response.data;
			if(success===true) {
				return Promise.resolve(data);
			}else if(success===undefined||success===null){
				// vm.$message({
				//   type:"warning",
				//   message: '无效接口',
				//   duration: 1618,
				//   showClose: true,
				// })
				return Promise.reject("无效接口");
			} else {
				// vm.$message({
				//   type:"warning",
				//   message: info,
				//   duration: 1618,
				//   showClose: true,
				// })
				return Promise.reject(info);
			}
		} catch(err) {
				// vm.$notify.error({
				//   title:"内部错误",
				//   message: err,
				//   duration: 1618,
				//   showClose: true,
				// })
				return '';
		}
	},
	error => {
		const data = _.get(error, 'response.data');
		if(!data) {
			// vm.$notify({
			//   type,
			//   title:"未知错误",
			//   message: `详见log`,
			//   duration: 3000,
			//   position: 'bottom-right',
			// })
			console.error(error);
		}
		const { statusCode = null } = data;
		if(!!statusCode&&!isNaN(statusCode)) {
			const code = parseInt(statusCode, 10);
			let type = 'warning';
			let title = '提示';
			if(code >= 500) {
				type = 'error';
				title = '内部错误';
			}
			// vm.$notify({
			//   type,
			//   title:"内部错误",
			//   message: `${error.response.status} ${ data.message }`,
			//   duration: 3000,
			//   position: 'bottom-right',
			// })
		} else {
			// vm.$notify({
			//   type: 'error',
			//   title:"未知错误",
			//   message: `${error.response.status} ${ data.message }`,
			//   duration: 3000,
			//   position: 'bottom-right',
			// });
		}

		return Promise.reject(error);
	}
)

Vue.mixin({
	methods: {
		fetch: service,
	},
})
