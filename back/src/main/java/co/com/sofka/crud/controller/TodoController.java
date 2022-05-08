package co.com.sofka.crud.controller;

import co.com.sofka.crud.dto.TodoDTO;
import co.com.sofka.crud.mapper.TodoModelMapper;
import co.com.sofka.crud.service.ITodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api")
public class TodoController {

    private final ITodoService todoService;
    private final TodoModelMapper mapper;

    @Autowired
    public TodoController(ITodoService todoService, TodoModelMapper mapper) {
        this.todoService = todoService;
        this.mapper = mapper;
    }

    @GetMapping(value = "/todos")
    public ResponseEntity<List<TodoDTO>> list(){
        try {
            return ResponseEntity.ok(
                    todoService.list().stream().map(mapper::mapToTodoDTO).collect(Collectors.toList()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(value = "/todo")
    public ResponseEntity<TodoDTO> save(@RequestBody TodoDTO todoDTO){
        try {
            return ResponseEntity.ok(mapper.mapToTodoDTO(todoService.save(mapper.mapToTodo(todoDTO))));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/todo")
    public ResponseEntity<TodoDTO> update(@RequestBody TodoDTO todoDTO){
        try {
            return ResponseEntity.ok(mapper.mapToTodoDTO(todoService.update(mapper.mapToTodo(todoDTO))));
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping(value = "/{id}/todo")
    public ResponseEntity<String> delete(@PathVariable("id")Long id){
        try {
            todoService.delete(id);
            return ResponseEntity.ok("Se elimino con éxito el registro");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping(value = "/{id}/todo")
    public ResponseEntity<TodoDTO> get(@PathVariable("id") Long id){
        try {
            return ResponseEntity.ok(mapper.mapToTodoDTO(todoService.get(id)));
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }
}
