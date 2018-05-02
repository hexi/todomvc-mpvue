import TodoApi from '../../api/TodoApi'

// initial state
const state = {
  todoList: []
}

// getters
const getters = {
  allTodoList: (state) => ({completed} = {}) => {
    if ((typeof completed) === 'boolean') {
      // completed有值，且是boolean类型
      return state.todoList.filter(item => item.completed === completed)
    } else {
      return state.todoList
    }
  }
}

// mutations
const mutations = {
  setTodoList: (state, todoList) => {
    state.todoList = todoList
  }
}

// actions
const actions = {
  getAllTodoList: async ({commit}) => {
    const data = await TodoApi.getAll()
    commit('setTodoList', data)
  },

  addItem: async ({commit, dispatch}, {title}) => {
    const added = await TodoApi.addItem(title)
    if (added && added.id > 0) {
      dispatch('getAllTodoList')
    }
  },
  deleteItem: async ({commit, dispatch}, {id}) => {
    const deleted = await TodoApi.deleteItem(id)
    if (deleted && deleted.id > 0) {
      dispatch('getAllTodoList')
    }
  },
  setComplete: async ({commit, dispatch}, {id, completed}) => {
    const updated = await TodoApi.updateItem({id, completed})
    if (updated && updated.id > 0) {
      dispatch('getAllTodoList')
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
