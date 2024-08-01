package com.springboot.blog.payload.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor

@NoArgsConstructor
public class UpdateUserInfoRequest {
    private Long id;
    private String email;
    private String firstName;
    private String password;
    private String lastName;
    private String avatar;
    private String address;
    private String description;
    private long numOfPosts;
    private long numOfComments;
    private boolean enabled;
}
