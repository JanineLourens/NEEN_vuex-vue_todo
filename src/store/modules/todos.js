import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default {
  state: {
    todos: []
  },
  getters: {
    allTodos: state => state.todos
  },
  mutations: {
    newTodoMutation: (state, todo) => {
      return state.todos.unshift(todo);
    },
    fetchTodosMutation: (state, todos) => {
      return (state.todos = todos);
    }
  },
  actions: {
    async newTodoAction({ commit }, todoTitle) {
      console.log("foo");
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: todoTitle,
          completed: false
        }
      );
      console.log("response", response.data);
      commit("newTodoMutation", response.data);
    },
    async fetchTodosAction({ commit }) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      commit("fetchTodosMutation", response.data);
    }
  }
};
