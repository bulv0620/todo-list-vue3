<script setup>
import { computed, reactive, watchEffect } from "vue";

const addTodoItem = () => {
    if (state.inputText !== "") {
        state.todos.push({
            id: state.todos.length + 1,
            text: state.inputText,
            done: false,
        });
        state.inputText = "";
    }
};

const removeTodoItem = (item) => {
    state.todos.splice(state.todos.indexOf(item), 1);
};

const editTodoItem = (item) => {
    state.editingItem = item;
    state.editCache = item.text;
};

const saveEdit = (item) => {
    state.editingItem = null;
};

const cancelEdit = (item) => {
    item.text = state.editCache;
    state.editingItem = null;
};

const filter = {
    all() {
        return state.todos;
    },
    active() {
        return state.todos.filter((item) => !item.done);
    },
    done() {
        return state.todos.filter((item) => item.done);
    },
};

const todoStorage = {
    fetch() {
        const todos = JSON.parse(localStorage.getItem("todos") || "[]");
        todos.forEach((item, index) => {
            item.id = index + 1;
        });
        return todos;
    },
    save(item) {
        localStorage.setItem("todo", JSON.stringify(item));
    },
};

const state = reactive({
    inputText: "",
    todos: todoStorage.fetch(),
    editCache: "",
    status: "all",
    editingItem: null,
    displayTodos: computed(() => filter[state.status]()),
});

watchEffect(() => {
    todoStorage.save(state.todos);
});

const vFocus = {
    mounted(el, { value }) {
        if (value) {
            el.focus();
        }
    },
};
</script>

<template>
    <div class="todo-list">
        <input
            type="text"
            v-model="state.inputText"
            @keyup.enter="addTodoItem"
            placeholder="输入待办事项"
        />
        <ul class="todo-list-ul">
            <li v-for="item in state.displayTodos" :key="item.id">
                <div class="show-item" v-if="state.editingItem !== item">
                    <input type="checkbox" v-model="item.done" />
                    <span
                        :class="{ done: item.done }"
                        @dblclick="editTodoItem(item)"
                        >{{ item.text }}</span
                    >
                    <button @click="removeTodoItem(item)">X</button>
                </div>
                <input
                    type="text"
                    v-if="state.editingItem === item"
                    v-model="item.text"
                    v-focus="state.editingItem === item"
                    @blur="saveEdit(item)"
                    @keyup.enter="saveEdit(item)"
                    @keyup.esc="cancelEdit(item)"
                />
            </li>
        </ul>
        <div class="status-option">
            <span
                :class="{ active: state.status === 'all' }"
                @click="state.status = 'all'"
                >all</span
            >
            <span
                :class="{ active: state.status === 'active' }"
                @click="state.status = 'active'"
                >active</span
            >
            <span
                :class="{ active: state.status === 'done' }"
                @click="state.status = 'done'"
                >done</span
            >
        </div>
    </div>
</template>

<style lang='less' scoped>
.todo-list {
    .todo-list-ul {
        li {
            .show-item {
                .done {
                    text-decoration: line-through;
                }
            }
        }
    }

    .status-option {
        span {
            padding: 0 10px;
            cursor: pointer;

            &.active {
                border: 1px solid #e3e3e3;
            }
        }
    }
}
</style>