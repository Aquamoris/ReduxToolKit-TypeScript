import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";

interface Todo {
    id: string,
    title: string,
    completed: boolean
}

interface TodosState {
    todos: Todo[],
    loading: boolean,
    error: string | null,
}

export const fetchTodos = createAsyncThunk<Todo[], void, {rejectValue: string}>(
    'todos/fetchTodos',
    async function (_, {rejectWithValue}) {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');

        if (!response.ok) {
            return rejectWithValue('Server error');
        }

        return await response.json();
    }
);

export const addNewTodo = createAsyncThunk<Todo, string, {rejectValue: string}>(
    'todos/addNewTodo',
    async function (text, {rejectWithValue}) {
        const todo = {
            title: text,
            userId: 1,
            completed: false,
        }

        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(todo)
        });

        return (await response.json()) as Todo;
    }
);

export const toggleStatus = createAsyncThunk<Todo, string, { rejectValue: string, state: { todos: TodosState } }>(
    'todos/toggleStatus',
    async function (id, {rejectWithValue, dispatch, getState}) {
        const todo = getState().todos.todos.find(todo => todo.id === id)

        if (todo) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            })

            return (await response.json()) as Todo;
        }

        return rejectWithValue('No such todo in list');
    }
)

export const deleteTodo = createAsyncThunk<string, string, { rejectValue: string }>(
    'todos/deleteTodo',
    async function (id, {rejectWithValue, dispatch}) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            return rejectWithValue('Can\'t delete task. Server error');
        }

        return id;
    }
)

const initialState: TodosState = {
    todos: [],
    loading: false,
    error: null
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.todos.push({
                id: new Date().toISOString(),
                title: action.payload,
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.loading = false;
            })
            .addCase(addNewTodo.pending, (state) => {
                state.error = null;
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(toggleStatus.fulfilled, (state, action) => {
                const toggledTodo = state.todos.find(t => t.id === action.payload.id);
                if (toggledTodo) {
                    toggledTodo.completed = !toggledTodo.completed;
                }
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(t => t.id !== action.payload);
            })
    }
})

export const {addTodo, removeTodo, toggleTodoComplete} = todosSlice.actions;

export default todosSlice.reducer;