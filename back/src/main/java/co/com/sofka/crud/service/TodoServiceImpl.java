package co.com.sofka.crud.service;

import co.com.sofka.crud.entity.Todo;
import co.com.sofka.crud.entity.TodoList;
import co.com.sofka.crud.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TodoServiceImpl implements ITodoService{

    private final TodoRepository todoRepository;

    @Autowired
    public TodoServiceImpl(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public List<Todo> list(){
        return todoRepository.findAll();
    }

    @Override
    public Todo save(Todo todo){
        return todoRepository.save(todo);
    }

    @Override
    public void delete(Long id){
        todoRepository.delete(get(id));
    }

    @Override
    public Todo update(Todo todo) {
        if (todoRepository.existsById(todo.getId())) {
            return save(todo);
        }
        throw new NoSuchElementException();
    }

    @Override
    public Todo get(Long id){
         return todoRepository.findById(id).orElseThrow();
    }

    @Override
    public List<Todo> getAllByTodoList(TodoList todoList) {
        return todoRepository.findAllByTodoList(todoList);
    }
}
