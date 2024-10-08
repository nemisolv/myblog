package com.springboot.blog.service.impl;

import com.springboot.blog.Constants;
import com.springboot.blog.entity.*;
import com.springboot.blog.exception.UniqueFieldViolationException;
import com.springboot.blog.payload.auth.AuthenticationRequest;
import com.springboot.blog.payload.auth.AuthenticationResponse;
import com.springboot.blog.payload.auth.RegisterRequest;
import com.springboot.blog.payload.auth.VerificationRequest;
import com.springboot.blog.payload.user.FullInfoUser;
import com.springboot.blog.repository.RoleRepository;
//import com.springboot.blog.repository.TokenRepository;
import com.springboot.blog.repository.UserRepository;
import com.springboot.blog.service.AuthService;
import com.springboot.blog.service.ConfirmationTokenService;
import com.springboot.blog.service.SettingService;
import com.springboot.blog.service.TwoFactorAuthenticationService;
import com.springboot.blog.utils.EmailSettingBag;
import com.springboot.blog.utils.Utility;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final RoleRepository roleRepo;
    //    private final TokenRepository tokenRepo;
    private final ModelMapper modelMapper;
    private final TwoFactorAuthenticationService tfaService;
    private final ConfirmationTokenService confirmationTokenService;
    private final SettingService settingService;



    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) throws BadRequestException {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(), request.getPassword()
        ));

        User user = (User) authentication.getPrincipal();
        if(!user.isConfirmedEmail()) {
            throw new BadCredentialsException("This account is not verified");
        }
        if(user.isTrashed()) {
            throw new BadCredentialsException("This account is banned. Contact admin for more information");
        }
        if (user.isMfaEnabled()) {
            return AuthenticationResponse.builder()
                    .token("")
                    .refreshToken("")
                    .secretImageUri(tfaService.generateQrImageUri(user.getSecret()))
                    .mfaEnabled(true)
                    .build();
        }
        return getAuthenticationResponse(user);

    }

//    private void revokedAllValidUserToken(User user) {
//        List<Token> validUserTokens = tokenRepo.findAllValidTokensByUser(user.getId());
//        if (!validUserTokens.isEmpty()) {
//            validUserTokens.forEach(token -> {
//                token.setExpired(true);
//                token.setRevoked(true);
//            });
//        }
//
//
//        tokenRepo.saveAll(validUserTokens);
//    }

    @Override
    @Transactional
    public void register(RegisterRequest request) throws UniqueFieldViolationException, MessagingException, UnsupportedEncodingException {
        // before that,let's checking email must be unique
        String email = request.getEmail();
        Optional<User> existingUser = userRepo.findByEmail(email);
        if (existingUser.isPresent()) {
            throw new UniqueFieldViolationException("This email: " + email + " address already exists, try with a different one");
        }

        UserRole roleDefault;
        //the first one
        if (userRepo.count() == 0) {
            roleDefault = UserRole.ADMIN;
        } else {
            // assign role: user by default
            roleDefault = UserRole.USER;
        }
        Role role = roleRepo.findByName(roleDefault)
                .orElseGet(() -> roleRepo.save(new Role(roleDefault)));

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Collections.singleton(role))
                .enabled(true)
                .authProvider(AuthProvider.local)
                .build();
        userRepo.save(user);
        // generate token verification email
        UUID uuid = UUID.randomUUID();
        String token = uuid.toString();
        ConfirmationToken confirmationToken = ConfirmationToken.builder()
                .token(token)
                .expiredAt(LocalDateTime.now().plusMinutes(Constants.TOKEN_EXPIRE))
                .user(user)
                .build();
        confirmationTokenService.saveToken(confirmationToken);
        sendVerificationEmail(user,token);
    }


    @Override
    public AuthenticationResponse refreshToken(HttpServletRequest request, HttpServletResponse response) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        // keep in mind that, no generate new refreshToken here
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            User user = userRepo.findByEmail(userEmail).orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
               String token = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                        .token(token)
                        .refreshToken(refreshToken).build();
            }
        }
        return null;
    }

    @Override
    public AuthenticationResponse verifyCode(VerificationRequest verificationRequest) {
        User user = userRepo.findByEmail(verificationRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format("Could not find any user with the give email: %s !", verificationRequest.getEmail())));

        if (tfaService.isOtpNotValid(user.getSecret(), verificationRequest.getCode())) {
            log.error("Code is not correct! {}", verificationRequest.getCode()) ;
            throw new BadCredentialsException("Code is not correct!");
        }
        return getAuthenticationResponse(user);


    }

    private AuthenticationResponse getAuthenticationResponse(User user) {

        String token = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken( user);
        FullInfoUser userData = modelMapper.map(user, FullInfoUser.class);

        return AuthenticationResponse
                .builder()
                .token(token)
                .refreshToken(refreshToken)
                .userData(userData)
                .mfaEnabled(user.isMfaEnabled())
                .build();
    }

//    private void savedUserToken(User user, String token) {
//        Token storeToken = Token.builder()
//                .token(token)
//                .tokenType(TokenType.BEARER)
//                .user(user)
//                .expired(false)
//                .revoked(false)
//                .build();
//        tokenRepo.save(storeToken);
//    }


    private void sendVerificationEmail( User user,String token)
            throws MessagingException, UnsupportedEncodingException {
        EmailSettingBag emailSettingBag = settingService.listMailSettings();
        JavaMailSenderImpl mailSender = Utility.prepareMailSender(emailSettingBag);
        String toAddress = user.getEmail();

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom(emailSettingBag.getMailFrom(),emailSettingBag.getSenderName());
        helper.setTo(toAddress);
        helper.setSubject("Please verify your email address");
        String mailContent = "<p>Dear " + user.getFirstName() + " " + user.getLastName() + ",</p>" +
                "<p>Thank you for registering. Please click on the below link to activate your account:</p>" +
                "<p><a href='[[URL]]'>Activate Now</a></p>" +
                "<p>Thank you</p>";
        String verifyURL = Constants.BASE_URL_FRONTEND + "/verify-email?token=" + token;
        mailContent = mailContent.replace("[[URL]]",verifyURL);
        helper.setText(mailContent,true);
        mailSender.send(message);

    }




}
