package co.com.sofka.crud.service;

import co.com.sofka.crud.entity.Todo;
import co.com.sofka.crud.entity.TodoList;

import java.util.List;

public interface ITodoService {

    List<Todo> list();

    Todo save(Todo todo);

    void delete(Long id);

    Todo update(Todo todo);

    Todo get(Long id);

    List<Todo> getAllByTodoList(TodoList todoList);
}
