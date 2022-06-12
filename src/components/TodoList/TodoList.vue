<script setup>
import { reactive } from "vue";
import TodoItem from "./TodoItem.vue";
import Filter from "./Filter.vue";
import useTodos from './useTodos'
import useFilter from './useFilter'

const statusList = ["all", "active", "done"];

const todoState = reactive({
    inputText: "",
    editingItem: null,
});

const {todos, addTodoItem, removeTodoItem} = useTodos(todoState);

const filterState = useFilter(todos)
</script>

<template>
    <div class="todo-list">
        <edit-todo
            v-model:editText="todoState.inputText"
            @keyup.enter="addTodoItem"
            placeholder="输入待办事项"
        ></edit-todo>

        <ul class="todo-list-ul">
            <todo-item
                v-for="item in filterState.displayTodos"
                :key="item.id"
                :todoItem="item"
                v-model:editingItem="todoState.editingItem"
                @removeTodo="removeTodoItem"
            ></todo-item>
        </ul>

        <Filter v-model="filterState.status" :statusList="statusList"></Filter>
    </div>
</template>

<style lang='less' scoped>
</style>