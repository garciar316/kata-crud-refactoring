package co.com.sofka.crud.service;

import co.com.sofka.crud.entity.Todo;
import co.com.sofka.crud.entity.TodoList;

import java.util.List;

public interface ITodoListService {

    List<TodoList> list();

    TodoList save(TodoList todoList);

    void delete(Long id);

    TodoList update(TodoList todoList);

    TodoList get(Long id);

    List<Todo> getTodosByListId(Long id);
}
