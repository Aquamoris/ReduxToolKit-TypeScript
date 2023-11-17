import React from "react";

interface Props {
    value: string,
    updateText: (str: string) => void,
    handleAction: () => void
}

const NewTodoForm: React.FC<Props> = ({value, updateText, handleAction}) => {
    return (
        <label>
            <input
                value={value}
                type="text"
                onChange={e => updateText(e.target.value)}
                placeholder='New todo'
            />
            <button onClick={handleAction}>Add todo</button>
        </label>
    )
}

export default NewTodoForm;