import React, {useEffect} from 'react';
import {useAppSelector} from "../hooks/hooks";
import {useDispatch, useSelector} from "react-redux";
import {fetchTodos} from "../storeJs/todoSlice";
import TodoItemJs from "./TodoItemJs";

const TodoList = () => {
    const todos = useAppSelector(state => state.todos.todos);
    const dispatch = useDispatch();
    const {status, error} = useSelector(state => state.todos);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    if (error) return <h3>Error : {error}</h3>

    return (
        <ul>
            {status === 'Loading' && <h2>Loading</h2>}
            {error  && <h3>Error: {error}</h3>}
            {
                todos.map(todo => (
                    <TodoItemJs key={todo.id} id={todo.id} text={todo.title} completed={todo.completed}/>
                ))
            }
        </ul>
    );
};

export default TodoList;