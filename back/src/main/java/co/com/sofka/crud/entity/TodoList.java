package co.com.sofka.crud.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "TODO_LIST")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class TodoList implements Serializable {

    private static final long serialVersionUID = 7622360779851174296L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "DESCRIPTION", nullable = false, length = 50)
    private String description;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        TodoList todoList = (TodoList) o;
        return id != null && Objects.equals(id, todoList.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
