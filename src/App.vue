<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <template>
      <div class="hello">
        <loader v-if="appLoading" />
        <h1>The Typical TODO practice project ™️</h1>
        <p>
          ... because what else.
        </p>
        <todo-input />
        <div class="todo-wrapper">
          <div
            v-for="(todo, i) in allTodos"
            class="card"
            :class="{ completed: todo.completed }"
            :key="`${i}-${todo.id}`"
          >
            <h3>{{ todo.title }}</h3>
            <div class="icon-container">
              <span class="check">
                <i @click="onCheck(todo)" class="far fa-square"></i>
              </span>
              <span class="delete" @click="removeTodoAction(todo.id)">
                <i class="fas fa-trash-alt"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import todoInput from "./components/TodoInput";
import loader from "./components/Loader";

export default {
  name: "app",
  components: {
    todoInput,
    loader
  },
  created() {
    this.fetchTodosAction();
  },
  props: {},
  methods: {
    ...mapActions(["fetchTodosAction", "removeTodoAction", "updateTodoAction"]),
    onCheck(todo) {
      this.updateTodoAction({
        ...todo,
        completed: !todo.completed
      });
    }
  },
  computed: {
    ...mapState({
      appLoading: state => state.todos.appLoading
    }),
    ...mapGetters(["allTodos"])
  },
  watch: {
    appLoading(bool) {
      if (bool) {
        document.documentElement.style.overflow = "hidden";
        // document.documentElement is the same as using document.querySelector('#root')
      } else {
        document.documentElement.style.overflow = "auto";
      }
    }
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
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-gap: 10px;

  background-color: #fff;
  color: #444;
  max-width: 800px;
  margin: 0 auto;
}

.card {
  position: relative;
  flex-direction: column;
  padding: 40px 40px 8px;
  min-height: 205px;
  color: #fff;
  font: 20px "Rosario", sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

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
  h3 {
    width: 100%;
    margin: 0;
    flex: 5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
    height: 100%;
    font-size: 17px;
    color: #d9d9d9;
    text-decoration: none !important;

    &:hover .fa-trash-alt:before {
      opacity: 1;
      cursor: pointer;
      content: "\f1f8";
      color: #fff;
    }

    &:hover .fa-square:before {
      opacity: 1;
      cursor: pointer;
      content: "\f14a";
      color: #fff;
    }
  }

  .icon-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 27px;
    .check {
      margin-left: -22px;
    }

    .delete {
      margin-right: -22px;
    }
  }
}

.completed {
  background-color: #34495e;
  background: linear-gradient(
        to left bottom,
        transparent 50%,
        rgba(0, 0, 0, 0.4) 0
      )
      no-repeat 100% 0/2em 2em,
    linear-gradient(-135deg, transparent 1.5em, #34495e 0);

  h3 {
    text-decoration: line-through;
    opacity: 0.7;
  }

  .fa-square:before {
    content: "\f14a";
  }
}
</style>
