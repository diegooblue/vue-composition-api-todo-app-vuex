import { createStore } from 'vuex';

const store = createStore({
    state: {
        todos: []
    },
    getters: {
        totalTodos(state) {
            return state.todos.length;
        }
    },
    mutations: {
        ADD_TODO(state, newTodo) {
            state.todos.push({
                id: Date.now(),
                done: false,
                content: newTodo,
            });
        },
        REMOVE_TODO(state, index) {
            state.todos.splice(index, 1)
        },
        REMOVE_ALL(state) {
            state.todos = []
        },
        MARK_ALL(state) {
            state.todos.forEach((todo) => (todo.done = true));
        },
        MARK_DONE(state, todo) {
            todo.done = !todo.done;
            const index = state.todos.findIndex((p) => p.content === todo.content)
            state.todos[index] = todo
        }

    },
    actions: {
        addTodo({ commit }, newTodo) {
            commit('ADD_TODO', newTodo)
        },
        removeTodo({ commit }, index) {
            commit('REMOVE_TODO', index)
        },
        removeAll({ commit }) {
            commit('REMOVE_ALL')
        },
        markAll({ commit }) {
            commit('MARK_ALL')
        },
        markDone({ commit }, todo) {
            commit('MARK_DONE', todo)
        }
    },

})

export default store