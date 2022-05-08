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
@Table(name = "TODO")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Todo implements Serializable {

    private static final long serialVersionUID = -5280978536572485742L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "NAME", nullable = false, length = 125)
    private String name;
    @Column(name = "COMPLETED", nullable = false)
    private boolean completed;
    @ManyToOne
    @JoinColumn(name = "LIST_ID")
    private TodoList todoList;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Todo todo = (Todo) o;
        return id != null && Objects.equals(id, todo.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
