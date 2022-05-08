package co.com.sofka.crud.controller;

import co.com.sofka.crud.dto.TodoDTO;
import co.com.sofka.crud.dto.TodoListDTO;
import co.com.sofka.crud.entity.Todo;
import co.com.sofka.crud.mapper.TodoModelMapper;
import co.com.sofka.crud.service.ITodoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api")
public class TodoListController {

    private final ITodoListService todoListService;
    private final TodoModelMapper mapper;

    @Autowired
    public TodoListController(ITodoListService todoListService, TodoModelMapper mapper) {
        this.todoListService = todoListService;
        this.mapper = mapper;
    }

    @GetMapping(value = "/lists")
    public ResponseEntity<List<TodoListDTO>> list(){
        try {
            return ResponseEntity.ok(
                    todoListService.list().stream().map(mapper::mapToTodoListDTO).collect(Collectors.toList()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(value = "/list")
    public ResponseEntity<TodoListDTO> save(@RequestBody TodoListDTO todoListDTO){
        try {
            return ResponseEntity.ok(mapper.mapToTodoListDTO(todoListService.save(mapper.mapToTodoList(todoListDTO))));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/list")
    public ResponseEntity<TodoListDTO> update(@RequestBody TodoListDTO todoListDTO){
        try {
            return ResponseEntity.ok(mapper.mapToTodoListDTO(todoListService.update(mapper.mapToTodoList(todoListDTO))));
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping(value = "/{id}/list")
    public ResponseEntity<String> delete(@PathVariable("id")Long id){
        try {
            todoListService.delete(id);
            return ResponseEntity.ok("Se elimino con éxito el registro");
        } catch (DataIntegrityViolationException e1) {
            e1.printStackTrace();
            return ResponseEntity.badRequest().build();
        } catch (Exception e2) {
            e2.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping(value = "/{id}/list")
    public ResponseEntity<TodoListDTO> get(@PathVariable("id") Long id){
        try {
            return ResponseEntity.ok(mapper.mapToTodoListDTO(todoListService.get(id)));
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(value = "/{id}/todos")
    public ResponseEntity<List<TodoDTO>> getTodosByListId(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(
                    todoListService.getTodosByListId(id).stream().map((mapper::mapToTodoDTO)).collect(Collectors.toList()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
