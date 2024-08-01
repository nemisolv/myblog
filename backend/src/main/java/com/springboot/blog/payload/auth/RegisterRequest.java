package com.springboot.blog.payload.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "First name can't be blank")
    @Length(min = 2, max = 30, message = "First name must be between 2 and 30 characters")
    private String firstName;
    @NotBlank(message = "Last name can't be blank")
    @Length(min = 2, max = 30, message = "Last name must be between 2 and 30 characters")
    private String lastName;
    @NotBlank(message = "Email can't be blank")
    @Length(min = 10, max = 255, message = "Email must be between 10 and 255 characters")
    @Email(message = "Invalid email format")
    private String email;
    @NotBlank(message = "Password can't be blank")
    @Length(min = 6, max = 50, message = "Password must be between 6 and 50 characters")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    private String password;
}
