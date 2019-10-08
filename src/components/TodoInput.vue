<template>
  <form @submit="onSubmit">
    <input
      type="text"
      autofocus="autofocus"
      autocomplete="off"
      placeholder="What needs to be done?"
      v-model="title"
      class="new-todo"
    />
    <input type="submit" value="Submit" />
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "todoInput",
  data() {
    return {
      title: ""
    };
  },
  methods: {
    ...mapActions(["newTodoAction"]),
    onSubmit(e) {
      e.preventDefault();
      this.newTodoAction(this.title);
    }
  }
};
</script>

<style scoped lang="scss">
form {
  display: flex;
  margin: 0 auto;
  margin-bottom: 3em;
  max-width: 320px;
  display: flex;
  justify-content: center;
}

input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid green;
}

input[type="submit"] {
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px solid #41b883;
  cursor: pointer;
}
.new-todo {
  min-height: 30px;
  padding: 0 0 0 5px;
  font-size: 1em;
}
</style>
