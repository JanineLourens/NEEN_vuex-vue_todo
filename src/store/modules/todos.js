import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// import { guidGenerator } from "../../utils";

/** NOTE: THE  PUT/POST/DEL API CALLS TO JSONPLACEHOLDER doesn't actually do anything */
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
    setLoadingMutation: (state, bool) => (state.appLoading = bool),
    removeTodoMutation: (state, id) =>
      (state.todos = state.todos.filter(todo => todo.id !== id)),
    updateTodoMutation: (state, updatedTodo) => {
      const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
      console.log("hey", index);
      if (index !== -1) {
        state.todos.splice(index, 1, updatedTodo);
      }
    }
  },
  actions: {
    async newTodoAction({ commit }, todoTitle) {
      commit("setLoadingMutation", true);
      const customId = Math.floor(Math.random() * 10) + 1;
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: todoTitle,
          completed: false,
          id: customId
        }
      );

      commit("newTodoMutation", { ...response.data, id: customId });
      commit("setLoadingMutation", false);
    },
    async fetchTodosAction({ commit }) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      commit("fetchTodosMutation", response.data);
    },
    async removeTodoAction({ commit }, todoId) {
      commit("setLoadingMutation", true);
      await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${todoId}`
      );
      commit("removeTodoMutation", todoId);
      commit("setLoadingMutation", false);
    },
    async updateTodoAction({ commit }, updatedTodo) {
      commit("setLoadingMutation", true);
      console.log("updated,todo", updatedTodo);

      //  This doesn't actually do anything
      await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`
      );

      commit("updateTodoMutation", updatedTodo);
      commit("setLoadingMutation", false);
    }
  }
};
