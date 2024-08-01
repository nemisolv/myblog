package com.springboot.blog.payload.auth;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VerificationRequest {
    @Email(message = "Please provide a valid email")
    private String email;
    @Length(min = 6, max = 6, message = "Please provide a 6 digit code")
    private String code;
}
