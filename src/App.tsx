import React, {useState} from 'react';
import TodoList from "./components/TodoList";
import NewTodoForm from "./components/NewTodoForm";
import {useAppDispatch} from "./hooks/hooks";
import {addNewTodo} from "./store/todoSlice";

function App() {
    const [text, setText] = useState<string>('');
    const dispatch = useAppDispatch();

    const handleAction = () => {
        if (text.trim().length) {
            dispatch(addNewTodo(text));
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
            {/*<Todos />*/}
        </div>
    );
}

export default App;
