import React, { useContext, useEffect } from 'react';
import {TodoContext} from '../../context/TodoContext';
import {actions} from '../../components/Reducer/actions'

const ListTodo = () => {
    const { HOST_API, dispatch, state: { todo } } = useContext(TodoContext);
    const currentList = todo.list;

    useEffect(() => {
        fetch(HOST_API + "/todos")
            .then(response => response.json())
            .then((list) => {
                dispatch({ type: actions.UPDATE_LIST, list })
            })
    }, [HOST_API, dispatch]);


    const onDelete = (id) => {
        fetch(HOST_API + "/" + id + "/todo", {
            method: "DELETE"
        }).then(() => {
            dispatch({ type: actions.DELETE, id })
        })
    };

    const onEdit = (todo) => {
        dispatch({ type: "edit-item", item: todo })
    };

    const onChange = (event, todo) => {
        const request = {
            name: todo.name,
            id: todo.id,
            completed: event.target.checked,
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
            });
    };

    const decorationDone = {
        textDecoration: 'line-through'
    };
    return (
        <div>
            <table >
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Tarea</td>
                        <td>¿Completado?</td>
                    </tr>
                </thead>
                <tbody>
                    {currentList.map((todo) =>
                        <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
                            <td>{todo.id}</td>
                            <td>{todo.name}</td>
                            <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input></td>
                            <td><button onClick={() => onDelete(todo.id)}>Eliminar</button></td>
                            <td><button onClick={() => onEdit(todo)}>Editar</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListTodo;