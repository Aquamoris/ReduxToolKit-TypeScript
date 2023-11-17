import React, {useState} from 'react';
import TodoList from "./components/TodoList";
import NewTodoForm from "./components/NewTodoForm";
import {useAppDispatch} from "./hooks/hooks";
import {addTodo} from "./store/todoSlice";

function App() {
    const [text, setText] = useState<string>('');
    const dispatch = useAppDispatch();

    const handleAction = () => {
        if (text.trim().length) {
            dispatch(addTodo(text));
            setText('');
        }
    }

    return (
        <div>
            <NewTodoForm
                value={text}
                updateText={setText}
                handleAction={handleAction}
            />
            <TodoList />
        </div>
    );
}

export default App;
