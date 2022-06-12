<script setup>
import { reactive } from "@vue/reactivity";

const props = defineProps({
    todoItem: {
        type: Object,
        required: true,
    },
    editingItem: Object,
});

const emit = defineEmits(['removeTodo', "update:editingItem"]);

const state = reactive({
    editCache: "",
});

function editTodoItem(item) {
    state.editCache = item.text;
    emit("update:editingItem", item);   
}

function removeTodoItem(item) {
    emit('removeTodo', item)
}

function saveEdit(item) {
    emit('update:editingItem', null)
}

function cancelEdit(item) {
    item.title = state.editCache;
    emit('update:editingItem', null)
}

const vFocus = {
    mounted(el, { value }) {
        if (value) {
            el.focus();
        }
    },
};
</script>

<template>
    <li>
        <div class="show-item" v-if="editingItem !== todoItem">
            <input type="checkbox" v-model="todoItem.done" />
            <span :class="{ done: todoItem.done }" @dblclick="editTodoItem(todoItem)">{{
                todoItem.text
            }}</span>
            <button @click="removeTodoItem(todoItem)">X</button>
        </div>
        <edit-todo
            v-if="editingItem === todoItem"
            v-model:editText="todoItem.text"
            v-focus="editingItem === todoItem"
            @blur="saveEdit(todoItem)"
            @keyup.enter="saveEdit(todoItem)"
            @keyup.esc="cancelEdit(todoItem)"
        ></edit-todo>
    </li>
</template>

<style lang='less' scoped>
li {
    .show-item {
        .done {
            text-decoration: line-through;
        }
    }
}
</style>