import React, {useContext, useRef, useState} from 'react';
import {TodoContext} from '../../context/TodoContext';
import {actions} from '../../components/Reducer/actions'

const AddTodoForm = () => {
    const { HOST_API, dispatch, state: { todo } } = useContext(TodoContext);
    const formRef = useRef(null);
    const item = todo.item;
    const [state, setState] = useState(item);

    const onAdd = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: null,
            completed: false,
            groupListId: ""
        };


        fetch(HOST_API + "/todo", {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                dispatch({ type: actions.ADD, item: todo });
                setState({ name: "" });
                formRef.current.reset();
            });
    }

    const onEdit = (event) => {
        event.preventDefault();

        const request = {
            name: state.name,
            id: item.id,
            completed: item.isCompleted,
            groupListId: ""
        };


        fetch(HOST_API + "/todo", {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                dispatch({ type: actions.UPDATE, item: todo });
                setState({ name: "" });
                formRef.current.reset();
            });
    }

    return (
        <form ref={formRef}>
            <input
                type="text"
                name="name"
                placeholder="¿Qué piensas hacer hoy?"
                defaultValue={item.name}
                onChange={(event) => {
                    setState({ ...state, name: event.target.value })
                }}  ></input>
            {item.id && <button onClick={onEdit}>Actualizar</button>}
            {!item.id && <button onClick={onAdd}>Crear</button>}
        </form>
    );
}
export default AddTodoForm;