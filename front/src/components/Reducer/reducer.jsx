import { actions } from './actions'
export function reducer(state, action) {
    switch (action.type) {
        case actions.UPDATE:
            const todoUpItem = state.todo;
            const listUpdateEdit = todoUpItem.list.map((item) => {
                if (item.id === action.item.id) {
                    return action.item;
                }
                return item;
            });
            todoUpItem.list = listUpdateEdit;
            todoUpItem.item = {};
            return { ...state, todo: todoUpItem }
        case actions.DELETE:
            const todoUpDelete = state.todo;
            const listUpdate = todoUpDelete.list.filter((item) => {
                return item.id !== action.id;
            });
            todoUpDelete.list = listUpdate;
            return { ...state, todo: todoUpDelete }
        case actions.UPDATE_LIST:
            const todoUpList = state.todo;
            todoUpList.list = action.list;
            return { ...state, todo: todoUpList }
        case actions.EDIT:
            const todoUpEdit = state.todo;
            todoUpEdit.item = action.item;
            return { ...state, todo: todoUpEdit }
        case actions.ADD:
            const todoUp = state.todo.list;
            todoUp.push(action.item);
            return { ...state, todo: { list: todoUp, item: {} } }
        default:
            return state;
    }
}