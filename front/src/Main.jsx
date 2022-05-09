import React, { useReducer, useState, useEffect } from 'react';
import { TodoContext } from './context/TodoContext';

import { reducer } from './components/Reducer/reducer';
import ListTodo from './components/ListTodo/ListTodo';
import AddTodoForm from './components/AddTodoForm/AddTodoForm';
import EditTodoForm from './components/EditTodoForm/EditTodoForm';
import {actions} from './components/Reducer/actions';
import { getTodos } from './services/TodoService';

const initialState = {
    todo: { list: [], item: {} }
};
const Main = () => {
    const HOST_API = "http://localhost:8080/api";
    const [state, dispatch] = useReducer(reducer, initialState);
    const [todoEditing, setTodoEditing] = useState(false);

    useEffect(() => {
        (async function () {
            const {status, data} = await getTodos();
            if (status === 200) {
                dispatch({ type: actions.UPDATE_LIST, payload: data });
            }
        }) ();
    }, [dispatch]);

    return (
        <div className="container mt-5">
            <TodoContext.Provider value={{
                HOST_API,
                state,
                dispatch,
                setTodoEditing
            }}>
                { todoEditing ? <EditTodoForm /> : <AddTodoForm /> }
                <ListTodo />
            </TodoContext.Provider>
        </div>
    );
}
export default Main;