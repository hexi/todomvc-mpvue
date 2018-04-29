// initial state
const state = {
  count: 0
}

// getters
const getters = {
  count: state => state.count
}

// mutations
const mutations = {
  increment: (state) => {
    const obj = state
    obj.count += 1
  },
  decrement: (state) => {
    const obj = state
    obj.count -= 1
  }
}

// actions
const actions = {
  increment: ({commit}) => {
    commit('increment')
  },
  decrement: ({commit}) => {
    commit('decrement')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
