import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { actions } from '../Reducer/actions';
import { addList } from '../../services/TodoListService';
import { useForm } from 'react-hook-form';

const AddTodoListForm = () => {
    const { listsDispatch } = useContext(TodoContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onAdd = (formData, event) => {
        const request = {
            description: formData.description,
        };
        (async function () {
            const { status, data } = await addList(request);
            if (status === 200) {
                listsDispatch({ type: actions.ADD, payload: data });
            }
        })();
        event.target.reset();
    }
    return (
        <div className=" container mb-3">
            <form onSubmit={handleSubmit(onAdd)} className="row g-3 align-items-center">
                <div className="col-auto">
                    <h3><label htmlFor="description" className="col-form-label">Agregar nueva lista</label></h3>
                </div>
                <div className="col-6">
                    <input
                        type="text"
                        placeholder="Nombre de la lista..."
                        className="form-control"
                        id="description"
                        {...register('description', { required: true, message: 'Este campo es requerido' })}
                    ></input>
                </div>
                <div className="col-auto">
                    <input className="form-control btn btn-primary" type="submit" value="Crear" />
                </div>
            </form>
            <div>
                {errors?.name?.message}
            </div>
        </div>
    );
}
export default AddTodoListForm;