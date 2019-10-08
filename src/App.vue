<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <template>
      <div class="hello">
        <h1>The Typical TODO practice project ™️</h1>
        <p>
          ... because what else.
        </p>
        <todo-input />
        <div class="todo-wrapper">
          <div v-for="todo in allTodos" class="card" :key="todo.id">
            {{ todo.title }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import todoInput from "./components/TodoInput";

export default {
  name: "app",
  components: {
    todoInput
  },
  created() {
    this.fetchTodosAction();
  },
  props: {
    msg: String
  },
  methods: {
    ...mapActions(["fetchTodosAction"])
  },
  computed: {
    ...mapGetters(["allTodos"])
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.todo-wrapper {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-gap: 10px;
  background-color: #fff;
  color: #444;
  max-width: 800px;
  margin: 0 auto;
}
.card {
  position: relative;
  padding: 40px;
  min-height: 180px;
  color: #fff;
  font: 20px "Rosario", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #42b983;
  background: linear-gradient(
        to left bottom,
        transparent 50%,
        rgba(0, 0, 0, 0.4) 0
      )
      no-repeat 100% 0 / 2em 2em,
    linear-gradient(-135deg, transparent 1.5em, #42b983 0);
  filter: drop-shadow(20px 30px rgba(0, 0, 0, 0.1));

  &::before {
    content: " ";
    position: absolute;
    top: 2em;
    right: 0;
    background: linear-gradient(
        to left bottom,
        transparent 50%,
        rgba(0, 0, 0, 0.1) 0
      )
      100% 0 no-repeat;
    width: 2em;
    height: 2em;
    transform: rotate(180deg);
  }
}
</style>
