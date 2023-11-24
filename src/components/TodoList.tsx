import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import TodoItem from "./TodoItem";
import {fetchTodos} from "../store/todoSlice";


const TodoList:React.FC = () => {
    const todos = useAppSelector(state => state.todos.todos);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch]);

    return (
        <ul>
            {
                todos.map(todo => (
                    <TodoItem key={todo.id} id={todo.id} text={todo.title} completed={todo.completed} />
                ))
            }
        </ul>
    );
};

export default TodoList;