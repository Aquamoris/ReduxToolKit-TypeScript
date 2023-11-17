import React, {FC} from 'react';
import {useAppDispatch} from "../hooks/hooks";
import {removeTodo, toggleTodoComplete} from "../store/todoSlice";

interface Props {
    id: string,
    text: string,
    completed: boolean
}

const TodoItem:FC<Props> = ({id, text, completed}) => {
    const dispatch = useAppDispatch();

    return (
        <li>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => dispatch(toggleTodoComplete(id))}
            />
            <span>{text}</span>
            <span onClick={() => dispatch(removeTodo(id))}>
                &times;
            </span>
        </li>
    );
};

export default TodoItem;