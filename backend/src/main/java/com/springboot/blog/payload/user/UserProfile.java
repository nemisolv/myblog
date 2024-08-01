package com.springboot.blog.payload.user;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfile {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String avatar;
    private String address;
    private String description;
    private long numOfPosts;
    private long numOfComments;
    private boolean enabled;
}
