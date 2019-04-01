export const state = () => ({
	searchText: '',

})

export const mutations = {
  setSearchText(state, in_tagOrName) {
		state.searchText = in_tagOrName;
  }
}

// export const getters = {
//   get(state) {
//     return state.list
//   }
// }
