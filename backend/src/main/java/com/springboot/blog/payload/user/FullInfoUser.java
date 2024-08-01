package com.springboot.blog.payload.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class FullInfoUser {
    private Long id;
    private String email;
    private String firstName;
    private String roles;
    private String authProvider;
    private boolean mfaEnabled;
    private String lastName;
    private String avatar;
    private String address;
    private String description;
    private long numOfPosts;
    private long numOfComments;
}
