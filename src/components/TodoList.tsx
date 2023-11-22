import React, {useEffect} from 'react';
import {useAppSelector} from "../hooks/hooks";
import TodoItem from "./TodoItem";
import {fetchTodos} from "../storeJs/todoSlice";

const TodoList:React.FC = () => {
    const todos = useAppSelector(state => state.todos.todos);

    useEffect(() => {

    }, []);

    return (
        <ul>
            {
                todos.map(todo => (
                    <TodoItem key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} />
                ))
            }
        </ul>
    );
};

export default TodoList;