import _ from 'lodash';

export const state = () => ({
	/*文章列表*/
	list: [],
	/*主题列表*/
	subjects: [],
	/*查询索引*/
	searchText: '',
	/*排列方式*/
	order: 'updateTime',

})

export const mutations = {

	setList(state, in_list) {
		state.list = in_list;
	},

	setSubjects(state, in_subjects) {
		state.subjects = in_subjects;
	},

	setSearchText(state, in_tagOrName) {
		state.searchText = in_tagOrName;
	},

	setOrder(state, in_order) {
		state.order = in_order;
	}

}

function getDict(in_subjects) {
	const tree = _.cloneDeep(in_subjects);
	const dict = {};
	const walkTree = (t_node) => {
		const {
			label = '', value = '', children = []
		} = t_node;
		if (label != '' && value != '') {
			dict[label] = value;
		}
		if (_.isArray(children) && children.length > 0) {
			_.forEach(children, (item) => {
				walkTree(item);
			})
		}
	}
	_.forEach(tree, (item) => {
		walkTree(item);
	})
	return dict;
}

export const getters = {
	// 当查询栏不为空时，过滤列表
	getSearchedList(state) {
		const {
			searchText
		} = state;
		if (searchText != '') {
			return _.filter(state.list, (item) => {
				return _.includes(item.title, searchText) || _.includes(item.subject, searchText);
			});
		} else {
			return state.list;
		}
	},
	getArticlesWithIcon(state, getters) {
		const list = getters.getSearchedList;
		const iconMap = getDict(state.subjects);
		const all = _.map(list, (item) => {
			const subjectArray = _.get(item, 'subject');
			if (_.isArray(subjectArray) && subjectArray.length > 0) {
				const subjectArrayLength = subjectArray.length;

				const getIcon = _.get(iconMap, item.subject[subjectArrayLength - 1])
				item.icon = getIcon || 'icon-404';
			} else {
				item.icon = 'icon-404';
			}
			return item;
		});
		return all;
	},
}
