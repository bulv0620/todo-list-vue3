import { reactive, computed } from "vue";

const filter = {
    all(todos) {
        return todos.value;
    },
    active(todos) {
        return todos.value.filter((item) => !item.done);
    },
    done(todos) {
        return todos.value.filter((item) => item.done);
    },
};

export default function useFilter(todos){
    const filterState = reactive({
        status: "all",
        displayTodos: computed(() => filter[filterState.status](todos)),
    });

    return filterState;
}