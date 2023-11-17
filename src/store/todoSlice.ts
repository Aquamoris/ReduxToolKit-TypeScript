import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Todo {
    id: string,
    text: string,
    completed: boolean
}

interface TodosState {
    todos: Todo[]
}

const initialState: TodosState = {
    todos: []
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.todos.push({
                id: new Date().toISOString(),
                text: action.payload,
                completed: false
            })
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter(t => t.id !== action.payload)
        },
        toggleTodoComplete(state, action: PayloadAction<string>) {
            const toggledTodo = state.todos.find(t => t.id === action.payload);
            if (toggledTodo) {
                toggledTodo.completed = !toggledTodo.completed;
            }
        }
    },
})

export const {addTodo, removeTodo, toggleTodoComplete} = todosSlice.actions;

export default todosSlice.reducer;