package co.com.sofka.crud.service;

import co.com.sofka.crud.entity.Todo;
import co.com.sofka.crud.entity.TodoList;
import co.com.sofka.crud.repository.TodoListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TodoListServiceImpl implements ITodoListService {

    private final TodoListRepository todoListRepository;
    private final ITodoService todoService;

    @Autowired
    public TodoListServiceImpl(TodoListRepository todoListRepository, ITodoService todoService) {
        this.todoListRepository = todoListRepository;
        this.todoService = todoService;
    }

    @Override
    public List<TodoList> list() {
        return todoListRepository.findAll();
    }

    @Override
    public TodoList save(TodoList todoList) {
        return todoListRepository.save(todoList);
    }

    @Override
    public void delete(Long id) {
        todoListRepository.deleteById(id);
    }

    @Override
    public TodoList update(TodoList todoList) {
        if (todoListRepository.existsById(todoList.getId())) {
            return todoListRepository.save(todoList);
        }
        throw new NoSuchElementException();
    }

    @Override
    public TodoList get(Long id) {
        return todoListRepository.findById(id).orElseThrow();
    }

    @Override
    public List<Todo> getTodosByListId(Long id) {
        TodoList todoList = get(id);
        return todoService.getAllByTodoList(todoList);
    }
}
