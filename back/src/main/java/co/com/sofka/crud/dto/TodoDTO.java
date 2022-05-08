package co.com.sofka.crud.dto;

import co.com.sofka.crud.entity.TodoList;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class TodoDTO implements Serializable {

    private static final long serialVersionUID = -9081881332598978331L;

    private Long id;
    private String name;
    private boolean completed;
    private TodoList todoList;
}
