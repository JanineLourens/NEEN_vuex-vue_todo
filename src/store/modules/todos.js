import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default {
  state: {
    appLoading: false,
    todos: []
  },
  getters: {
    allTodos: state => state.todos
  },
  mutations: {
    newTodoMutation: (state, todo) => {
      return state.todos.unshift(todo);
    },
    fetchTodosMutation: (state, todos) => (state.todos = todos),
    setLoadingMutation: (state, bool) => (state.appLoading = bool)
  },
  actions: {
    async newTodoAction({ commit }, todoTitle) {
      commit("setLoadingMutation", true);
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: todoTitle,
          completed: false
        }
      );
      commit("newTodoMutation", response.data);
      commit("setLoadingMutation", false);
    },
    async fetchTodosAction({ commit }) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      commit("fetchTodosMutation", response.data);
    }
  }
};