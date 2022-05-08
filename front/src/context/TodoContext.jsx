import {createContext} from 'react';

const initialState = {
  todo: { list: [], item: {} }
};
export const TodoContext = createContext(initialState);