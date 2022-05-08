package co.com.sofka.crud.repository;

import co.com.sofka.crud.entity.Todo;
import co.com.sofka.crud.entity.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findAllByTodoList(TodoList todoList);
}
