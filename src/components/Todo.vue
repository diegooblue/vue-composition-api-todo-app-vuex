<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
  <form @submit.prevent="addNewTodo">
    <label>New Todo</label>
    <input v-model="newTodo" name="newTodo" />
    <button>Add New Todo</button>
  </form>
  <button @click="markAllDone">Mark All Done</button>
  <button @click="removeAllTodos">Remove All</button>
  <ul>
    <li v-for="(todo, index) in todos" :key="todo.id">
      <h3 :class="{ done: todo.done }" class="todo" @click="toggleDone(todo)">
        {{ todo.content }}
      </h3>
      <button @click="removeTodo(index)">Remove Todo</button>
    </li>
  </ul>
  <p>Total: {{ totalTodos }}</p>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Todo",
  props: {
    msg: String,
  },
  setup() {
    const store = useStore();
    const newTodo = ref("");

    const todos = computed(() => store.state.todos);
    const totalTodos = computed(() => store.getters.totalTodos);

    function addNewTodo() {
      store.dispatch("addTodo", newTodo.value);
      newTodo.value = "";
    }
    function toggleDone(todo) {
      store.dispatch("markDone", todo);
    }
    function removeTodo(index) {
      store.dispatch("removeTodo", index);
    }
    function markAllDone() {
      store.dispatch("markAll");
    }
    function removeAllTodos() {
      store.dispatch("removeAll");
    }

    return {
      totalTodos,
      addNewTodo,
      newTodo,
      todos,
      toggleDone,
      removeTodo,
      markAllDone,
      removeAllTodos,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 20px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 5px;
}
a {
  color: #42b983;
}
.todo {
  cursor: pointer;
}
.done {
  text-decoration: line-through;
}
</style>
