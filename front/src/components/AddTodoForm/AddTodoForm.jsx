import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { actions } from '../Reducer/actions';
import { addTodo } from '../../services/TodoService';
import { useForm } from 'react-hook-form';

const AddTodoForm = () => {
    const { dispatch } = useContext(TodoContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onAdd = (formData, event) => {
        const request = {
            name: formData.name,
            completed: false
        };
        (async function () {
            const { status, data } = await addTodo(request);
            if (status === 200) {
                dispatch({ type: actions.ADD, payload: data });
            }
        })();
        event.target.reset();
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onAdd)}>
                <input
                    type="text"
                    placeholder="¿Qué piensas hacer hoy?"
                    {...register('name', { required: true, message: 'Este campo es requerido' })}
                    ></input>
                <input type="submit" value="Crear" />
            </form>
            <div>
                {errors?.name?.message}
            </div>
        </div>
    );
}
export default AddTodoForm;