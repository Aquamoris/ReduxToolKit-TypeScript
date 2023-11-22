import React from 'react';
import {toggleStatus, toggleTodoComplete} from "../storeJs/todoSlice";
import {deleteTodo} from "../storeJs/todoSlice";
import {useDispatch} from "react-redux";


const TodoItemJs = ({id, text, completed}) => {
    const dispatch = useDispatch();


    return (
        <li>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => dispatch(toggleStatus(id))}
            />
            <span>{text}</span>
            <span onClick={() => dispatch(deleteTodo(id))}>
                &times;
            </span>
        </li>
    );
};

export default TodoItemJs;