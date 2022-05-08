package co.com.sofka.crud.mapper;

import co.com.sofka.crud.dto.TodoDTO;
import co.com.sofka.crud.dto.TodoListDTO;
import co.com.sofka.crud.entity.Todo;
import co.com.sofka.crud.entity.TodoList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TodoModelMapper {

    private final ModelMapper mapper;

    @Autowired
    public TodoModelMapper(ModelMapper mapper) {
        this.mapper = mapper;
    }

    public Todo mapToTodo(TodoDTO todoDTO) {
        return mapper.map(todoDTO, Todo.class);
    }

    public TodoList mapToTodoList(TodoListDTO todoListDTO) {
        return mapper.map(todoListDTO, TodoList.class);
    }

    public TodoDTO mapToTodoDTO(Todo todo) {
        return mapper.map(todo, TodoDTO.class);
    }

    public TodoListDTO mapToTodoListDTO(TodoList todoList) {
        return mapper.map(todoList, TodoListDTO.class);
    }
}
