import { actions } from "./actions";
export function reducer(state, action) {
    const { type, payload } = action;
    switch (type) {
        case actions.UPDATE:
            return state.map((todo) => todo.id === payload.id ? payload : todo);
        case actions.DELETE:
            return state.filter((todo) => todo.id !== payload);
        case actions.ADD:
            return [...state, payload]
        case actions.UPDATE_LIST:
            return payload ? payload : state
        default:
            return state;
    }
}