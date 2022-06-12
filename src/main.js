import { createApp } from 'vue'
import App from './App.vue'
import EditTodo from './components/TodoList/EditTodo.vue'

createApp(App).component('edit-todo', EditTodo).mount('#app')
