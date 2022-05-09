import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { actions } from '../Reducer/actions';
import { updateList } from '../../services/TodoListService';
import { useForm } from 'react-hook-form';

const EditTodoListForm = () => {
    const { listsDispatch, listEditing, setListEditing } = useContext(TodoContext);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    setValue('description', listEditing.description);

    const onEdit = (formData) => {
        const request = {
            id: listEditing.id,
            description: formData.description,
        };

        (async function () {
            const { status, data } = await updateList(request);
            if (status === 200) {
                listsDispatch({ type: actions.UPDATE, payload: data });
                setListEditing(null);
            }
        })();
    }
    return (
        <div className=" container mb-3">
            <form onSubmit={handleSubmit(onEdit)} className="row g-3 align-items-center">
                <div className="col-auto">
                    <h3><label htmlFor="description" className="col-form-label">Editar lista</label></h3>
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
                    <input className="form-control btn btn-primary" type="submit" value="Editar" />
                </div>
            </form>
            <div>
                {errors?.name?.message}
            </div>
        </div>
    );
}
export default EditTodoListForm;