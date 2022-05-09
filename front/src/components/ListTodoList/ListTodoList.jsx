// import React, { useContext, useEffect } from 'react';
// import { TodoContext } from '../../context/TodoContext';
// import { actions } from '../../components/Reducer/actions'
// import { getLists, deleteList, updateList } from '../../services/TodoListService';
// import ListTodo from '../ListTodo/ListTodo';

// const ListTodoList = () => {
//     const { dispatch, setTodoEditing, state: { list } } = useContext(TodoContext);
//     const currentList = list.list;

//     useEffect(() => {
//         (async function () {
//             const { status, data } = await getLists();
//             if (status === 200) {
//                 dispatch({ type: actions.UPDATE_LIST, payload: data });
//             }
//         })();
//     }, [dispatch]);


//     const onDelete = (id) => {
//         (async function () {
//             const { status } = await deleteList(id);
//             if (status === 200) {
//                 dispatch({ type: actions.DELETE, payload: id });
//             }
//         })();
//     };

//     const onEdit = (_todo) => {
//         setTodoEditing(true);
//         dispatch({ type: actions.EDIT, payload: _todo });
//     };

//     const onChange = (event, _todo) => {
//         const request = {
//             name: _todo.name,
//             id: _todo.id,
//             completed: event.target.checked
//         };
//         (async function () {
//             const { status, data } = await updateList(request);
//             if (status === 200) {
//                 dispatch({ type: actions.UPDATE, payload: data });
//             }
//         })();
//     };
//     return (
//         <div className="row">
//             {currentList.map((_list) =>
//                 <div className="col-md-4" key={_list.id}>
//                     <h3>{_list.description}</h3>
//                     <ListTodo list_id={_list.id}/>
//                 </div>
//             )}
//         </div>
//     );
// }
// export default ListTodoList;