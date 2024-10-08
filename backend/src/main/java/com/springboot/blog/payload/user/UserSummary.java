package com.springboot.blog.payload.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserSummary {
    private Long id;
    private String firstName;
    private String lastName;
    private String avatar;
}
