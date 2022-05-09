import { actions } from './actions'
export function reducer(state, action) {
    const {type, payload} = action;
    switch (type) {
        case actions.UPDATE:
            const todoUpItem = state.todo;
            const listUpdateEdit = todoUpItem.list.map((item) => {
                if (item.id === payload.id) {
                    return payload;
                }
                return item;
            });
            todoUpItem.list = listUpdateEdit;
            todoUpItem.item = {};
            return { ...state, todo: todoUpItem }
        case actions.DELETE:
            const todoUpDelete = state.todo;
            const listUpdate = todoUpDelete.list.filter((item) => {
                return item.id !== payload;
            });
            todoUpDelete.list = listUpdate;
            return { ...state, todo: todoUpDelete }
        case actions.UPDATE_LIST:
            const todoUpList = state.todo;
            todoUpList.list = payload;
            return { ...state, todo: todoUpList }
        case actions.EDIT:
            const todoUpEdit = state.todo;
            todoUpEdit.item = payload;
            return { ...state, todo: todoUpEdit }
        case actions.ADD:
            const todoUp = state.todo.list;
            todoUp.push(payload);
            return { ...state, todo: { list: todoUp, item: {} } }
        default:
            return state;
    }
}