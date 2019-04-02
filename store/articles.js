import _ from 'lodash';

export const state = () => ({
	/*文章列表*/
	list: [],
	/*主题列表*/
	subjects: [],
	/*查询索引*/
	searchText: '',
	/*排列方式*/
	order: 'tile',

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

function getByTheme(datas, ntree) {
	// 文章分层: 遍历所有文章，根据文章subject属性的队列长度，把它放入sortByLayer里的二维数组里
	// 如果文章的队列长度为N,就把它放在subject[N]里
	// - 提供路径检测，检测文章主题路径是否与目前subjectTree结构相同, 不同则算作subject损坏，放到0层里
	// - 提供统计，记录每个主题有多少文章
	const sortByLayer = [
		[]
	]; // 分层二维数组
	const countRecord = {}; // 统计记录
	_.forEach(datas, (item) => {
		if (item.hasOwnProperty('subject') && item.subject.length > 0) {
			// 获取每篇文章主题长度，即可判断它的是第几层级
			const subjectLength = item.subject.length;
			// 保证数组前N-1项,不是空,如果在第N项读取时
			while (sortByLayer.length < subjectLength + 1) {
				sortByLayer.push([]);
			}
			// 判断路径是否正确, 如果路径不正确则放到0层里
			const mdSubPath = _.join(item.subject, '.');
			const isCorrectPath = _.get(ntree, mdSubPath);
			if (isCorrectPath) { // 当路径正确时
				sortByLayer[subjectLength].push(item); // 该层的队列添加此文档为新元素

				// 遍历该文章的所有主题，在countRecord对象的属性中，以该主题名字为命名的属性 + 1 作为统计。
				_.forEach(item.subject, subjectName => {
					_.set(countRecord, subjectName, (_.get(countRecord, subjectName) || 0) + 1)
				})

			} else { //当路径不正确时
				sortByLayer[0].push(item);
			}
			/* sortByLayer[ subjectLength ].push(item); */

		} else {
			sortByLayer[0].push(item);
		}
	})

	// 遍历主题树，深度优先遍历
	const treeWalker = (treeNode, deep) => {
		_.forEach(treeNode, walk => {
			// 判断是否有属性'value', 没有->不是主题节点->忽略
			if (walk.hasOwnProperty('value')) {
				const {
					label = '', children = []
				} = walk;
				// 添加统计信息
				_.set(walk, 'mdCount', _.get(countRecord, label) || 0);
				// 如果该节点孩子数量大于0，先递归子节点
				if (children.length > 0) {
					treeWalker(children, deep + 1);
				}
				// 获取与目前深度相同的分层等级的文章列表
				const curLayer = sortByLayer[deep];
				// 遍历该层的文章，与当前主题命名label相同的则把该文章加入此节点
				_.forEach(curLayer, md => {
					// 获取文章主题String，根据层深度
					const mdSubName = md.subject[deep - 1];
					// 判断主题是否与文章主题相同
					if (label == mdSubName) {
						// 如果该主题节点没有children字段,则新建一个
						if (!_.isArray(walk['children'])) {
							walk['children'] = [];
						}
						// 把文章压入队列
						walk['children'].push(md);
					}
				})
			}
		})
	}
	treeWalker(ntree, 1);

	// 把无主题或主题错误的放进去
	ntree.push({
		label: '无主题',
		value: '',
		children: sortByLayer[0],
		mdCount: sortByLayer[0].length,
	})

	return ntree;

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
	getArticlesByTheme(state) {
		const cloneList = _.cloneDeep(state.list);
		const cloneSubjects = _.cloneDeep(state.subjects)
		return getByTheme(cloneList, cloneSubjects);
	},
}
