import {ref, watchEffect} from 'vue'

const todoStorage = {
    fetch() {
        const todos = JSON.parse(localStorage.getItem("todos") || "[]");
        todos.forEach((item, index) => {
            item.id = index + 1;
        });
        return todos;
    },
    save(item) {
        localStorage.setItem("todos", JSON.stringify(item));
    },
};


export default function useTodos(state) {
    const todos = ref([])
    todos.value = todoStorage.fetch();

    function addTodoItem() {
        if (state.inputText !== "") {
            todos.value.push({
                id: todos.value.length + 1,
                text: state.inputText,
                done: false,
            });
            state.inputText = "";
        }
    }

    function removeTodoItem(item) {
        todos.value.splice(todos.value.indexOf(item), 1);
    }

    watchEffect(() => {
        todoStorage.save(todos.value);
    });

    return {
        todos,
        addTodoItem,
        removeTodoItem,
    }
}