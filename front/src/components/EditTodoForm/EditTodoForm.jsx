import React, { useContext, useState } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { actions } from '../Reducer/actions';
import { updateTodo } from '../../services/TodoService';
import { useForm } from 'react-hook-form';

const EditTodoForm = () => {
    const { dispatch, setTodoEditing, state: { todo } } = useContext(TodoContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const item = todo.item;
    const [state, setState] = useState(item);

    const onEdit = () => {
        setTodoEditing(false);
        const request = {
            name: state.name,
            id: item.id,
            completed: item.isCompleted,
        };

        (async function () {
            const { status, data } = await updateTodo(request);
            if (status === 200) {
                dispatch({ type: actions.UPDATE, payload: data });
                setState({ name: "" });
            }
        })();
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onEdit)}>
                <input
                    type="text"
                    placeholder="¿Qué piensas hacer hoy?"
                    {...register('name', { required: true, message: 'Este campo es requerido' })}
                    defaultValue={item.name}
                    onChange={(event) => {
                        setState({ ...state, name: event.target.value })
                    }}  ></input>
                <input type="submit" value="Editar" />
            </form>
            <div>
                {errors?.name?.message}
            </div>
        </div>
    );
}
export default EditTodoForm;