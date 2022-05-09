import React, { useReducer, useState } from 'react';
import { TodoContext } from './context/TodoContext';

import { reducer } from './components/Reducer/reducer';
import ListTodoList from './components/ListTodoList/ListTodoList';
import AddTodoListForm from './components/AddTodoList/AddTodoListForm';
import EditTodoListForm from './components/EditTodoListForm/EditTodoListForm';

const Main = () => {
    const HOST_API = "http://localhost:8080/api";
    const [todos, todosDispatch] = useReducer(reducer, []);
    const [lists, listsDispatch] = useReducer(reducer, []);
    const [todoEditing, setTodoEditing] = useState(null);
    const [listEditing, setListEditing] = useState(null);

    return (
        <div className="container-fluid mt-5">
            <TodoContext.Provider value={{
                HOST_API,
                todos,
                todosDispatch,
                lists,
                listsDispatch,
                todoEditing,
                setTodoEditing,
                listEditing,
                setListEditing
            }}>
                {listEditing ? <EditTodoListForm /> : <AddTodoListForm />}
                <hr />
                <ListTodoList />
            </TodoContext.Provider>
        </div>
    );
}
export default Main;