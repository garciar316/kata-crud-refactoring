import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { actions } from '../Reducer/actions';
import { addTodo } from '../../services/TodoService';
import { useForm } from 'react-hook-form';

const AddTodoForm = (props) => {
    const { todosDispatch } = useContext(TodoContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onAdd = (formData, event) => {
        const request = {
            name: formData.name,
            completed: false,
            todoList: props.list
        };
        (async function () {
            const { status, data } = await addTodo(request);
            if (status === 200) {
                todosDispatch({ type: actions.ADD, payload: data });
            }
        })();
        event.target.reset();
    }
    return (
        <div className="mb-3">
            <form onSubmit={handleSubmit(onAdd)} className="row">
                <div className="col-md-8">
                    <input
                    type="text"
                    placeholder="¿Qué piensas hacer hoy?"
                    className="form-control"
                    {...register('name', { required: true, message: 'Este campo es requerido' })}
                    ></input>
                </div>
                <div className="col-md-4">
                    <input className="form-control btn btn-primary" type="submit" value="Crear" />
                </div>
            </form>
            <div>
                {errors?.name?.message}
            </div>
        </div>
    );
}
export default AddTodoForm;