package com.springboot.blog.payload.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.springboot.blog.payload.user.FullInfoUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class AuthenticationResponse {
    private String token;
    private String refreshToken;
    private FullInfoUser userData;
    private boolean mfaEnabled;
    private String secretImageUri;
}
