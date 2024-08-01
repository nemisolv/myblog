package com.springboot.blog.entity;

import com.springboot.blog.utils.UserEntityListener;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


@Entity
@Table(name = "comments")
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@EntityListeners({AuditingEntityListener.class, UserEntityListener.class})
public class Comment extends AuditableEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", user=" + user.getId()+", post_id= "
                +post.getId();
    }

}
