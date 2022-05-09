import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { actions } from '../../components/Reducer/actions';
import { getTodos, deleteTodo, updateTodo } from '../../services/TodoService';
import { FaPen, FaTrash } from 'react-icons/fa';

const ListTodo = (props) => {
    const { todosDispatch, setTodoEditing, todos } = useContext(TodoContext);
    const _todos = todos.filter((todo) => todo.todoList?.id === props.list.id);

    useEffect(() => {
        (async function () {
            const { status, data } = await getTodos();
            if (status === 200) {
                todosDispatch({ type: actions.UPDATE_LIST, payload: data });
            }
        })();
    }, [todosDispatch]);

    const onDelete = (id) => {
        (async function () {
            const { status } = await deleteTodo(id);
            if (status === 200) {
                todosDispatch({ type: actions.DELETE, payload: id });
            }
        })();
    };

    const onEdit = (todo) => {
        setTodoEditing(todo);
    };

    const onChange = (event, todo) => {
        const request = {
            name: todo.name,
            id: todo.id,
            completed: event.target.checked,
            todoList: props.list
        };
        (async function () {
            const { status, data } = await updateTodo(request);
            if (status === 200) {
                todosDispatch({ type: actions.UPDATE, payload: data });
            }
        })();
    };

    const decorationDone = {
        textDecoration: 'line-through'
    };
    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="text-center">Ok?</th>
                        <th className="text-center">Tarea</th>
                        <th className="text-center">Eliminar</th>
                        <th className="text-center">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {_todos.map((todo) =>
                        <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
                            <td className="text-center">
                                <input
                                    type="checkbox"
                                    defaultChecked={todo.completed}
                                    className="form-check-input"
                                    onChange={(event) => onChange(event, todo)}
                                />
                            </td>
                            <td className="text-center">{todo.id}. {todo.name}</td>
                            <td className="text-center">
                                <button className="btn btn-outline-danger" onClick={() => onDelete(todo.id)}><FaTrash /></button>
                            </td>
                            <td className="text-center">
                                <button className="btn btn-outline-success" onClick={() => onEdit(todo)}><FaPen /></button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListTodo;