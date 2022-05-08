import React, { useReducer } from 'react';
import {TodoContext} from './context/TodoContext';

import { reducer } from './components/Reducer/reducer';
import ListTodo from './components/ListTodo/ListTodo';
import AddTodoForm from './components/AddTodoForm/AddTodoForm';

const initialState = {
    todo: { list: [], item: {} }
};
const Main = () => {
    const HOST_API = "http://localhost:8080/api";
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <TodoContext.Provider value={{
            HOST_API,
            state,
            dispatch
        }}>
            <AddTodoForm />
            <ListTodo />
        </TodoContext.Provider>
    );
}
export default Main;