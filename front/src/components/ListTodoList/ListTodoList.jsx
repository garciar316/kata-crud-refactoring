import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { actions } from '../../components/Reducer/actions'
import { getLists, deleteList } from '../../services/TodoListService';
import ListTodo from '../ListTodo/ListTodo';
import AddTodoForm from '../AddTodo/AddTodoForm';
import EditTodoForm from '../EditTodoForm/EditTodoForm';
import './styles.css';

const ListTodoList = () => {
    const { listsDispatch, setListEditing, lists, todoEditing } = useContext(TodoContext);

    useEffect(() => {
        (async function () {
            const { status, data } = await getLists();
            if (status === 200) {
                listsDispatch({ type: actions.UPDATE_LIST, payload: data });
            }
        })();
    }, [listsDispatch]);

    const onDelete = (id) => {
        (async function () {
            const { status } = await deleteList(id);
            if (status === 200) {
                listsDispatch({ type: actions.DELETE, payload: id });
            }
        })();
    };

    const onEdit = (list) => {
        setListEditing(list);
    };

    return (
        <div className="row">
            {lists.map((list) =>
                <div key={list.id} className="col-md-4 p-4">
                    <div className="card">
                        <h3 className="card-header text-center">{list.id}. {list.description}</h3>
                        <div className="card-body">
                            {todoEditing ? <EditTodoForm list={list}/> : <AddTodoForm list={list}/>}
                            <ListTodo list={list}/>
                            <div className="row">
                                <div className="col">
                                    <div className="btn-group" role="group">
                                        <button type="button" className="btn btn-success" onClick={() => onEdit(list)}>
                                            Editar
                                        </button>
                                        <button type="button" className="btn btn-danger" onClick={() =>onDelete(list.id)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default ListTodoList;