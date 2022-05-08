package co.com.sofka.crud.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class TodoListDTO implements Serializable {

    private static final long serialVersionUID = -7628118113980461753L;

    private Long id;
    private String description;
}
