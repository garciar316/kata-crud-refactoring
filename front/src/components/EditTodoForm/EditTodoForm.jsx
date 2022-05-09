import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { actions } from '../Reducer/actions';
import { updateTodo } from '../../services/TodoService';
import { useForm } from 'react-hook-form';

const EditTodoForm = (props) => {
    const { todosDispatch, todoEditing, setTodoEditing } = useContext(TodoContext);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    setValue('name', todoEditing.name);

    const onEdit = (formData) => {
        const request = {
            name: formData.name,
            id: todoEditing.id,
            completed: todoEditing.isCompleted,
            todoList: props.list
        };

        (async function () {
            const { status, data } = await updateTodo(request);
            if (status === 200) {
                todosDispatch({ type: actions.UPDATE, payload: data });
                setTodoEditing(null);
            }
        })();
    }
    return (
        <div className="mb-3">
            <form onSubmit={handleSubmit(onEdit)} className="row">
                <div className="col-md-8">
                    <input
                        type="text"
                        placeholder="¿Qué piensas hacer hoy?"
                        className="form-control"
                        {...register('name', { required: true, message: 'Este campo es requerido' })}
                    ></input>
                </div>
                <div className="col-md-4">
                    <input className="form-control btn btn-primary" type="submit" value="Editar" />
                </div>
            </form>
            <div>
                {errors?.name?.message}
            </div>
        </div>
    );
}
export default EditTodoForm;