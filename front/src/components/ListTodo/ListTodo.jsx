import React, { useContext, useEffect } from 'react';
import {TodoContext} from '../../context/TodoContext';
import {actions} from '../../components/Reducer/actions';
import { getTodos, deleteTodo, updateTodo } from '../../services/TodoService';

const ListTodo = () => {
    const { dispatch, setTodoEditing, state: { todo } } = useContext(TodoContext);
    const currentList = todo.list;

    useEffect(() => {
        (async function () {
            const {status, data} = await getTodos();
            if (status === 200) {
                dispatch({ type: actions.UPDATE_LIST, payload: data });
            }
        }) ();
    }, [dispatch]);

    const onDelete = (id) => {
        (async function () {
            const {status} = await deleteTodo(id);
            if (status === 200) {
                dispatch({ type: actions.DELETE, payload: id });
            }
        }) ();
    };

    const onEdit = (_todo) => {
        setTodoEditing(true);
        dispatch({ type: actions.EDIT, payload: _todo });
    };

    const onChange = (event, _todo) => {
        const request = {
            name: _todo.name,
            id: _todo.id,
            completed: event.target.checked
        };
        (async function () {
            const {status, data} = await updateTodo(request);
            if (status === 200) {
                dispatch({ type: actions.UPDATE, payload: data });
            }
        }) ();
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
                    {currentList.map((_todo) =>
                        <tr key={_todo.id} style={_todo.completed ? decorationDone : {}}>
                            <td>{_todo.id}</td>
                            <td>{_todo.name}</td>
                            <td><input type="checkbox" defaultChecked={_todo.completed} onChange={(event) => onChange(event, _todo)}></input></td>
                            <td><button onClick={() => onDelete(_todo.id)}>Eliminar</button></td>
                            <td><button onClick={() => onEdit(_todo)}>Editar</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListTodo;