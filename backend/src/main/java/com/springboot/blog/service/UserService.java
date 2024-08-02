package com.springboot.blog.service;

import com.springboot.blog.entity.User;
import com.springboot.blog.exception.ResourceNotFoundException;
import com.springboot.blog.payload.*;
import com.springboot.blog.payload.user.FullInfoUser;
import com.springboot.blog.payload.user.UpdateUserInfoRequest;
import com.springboot.blog.payload.user.UserDTO;
import com.springboot.blog.payload.user.PreviewUserProfile;

import java.util.List;

public interface UserService {
    PreviewUserProfile findById(Long id) throws ResourceNotFoundException;

//    PageResponse<UserDTO> listAllEnabledUser();
    PageResponse<UserDTO> listByPage(int pageSize, int pageNo, String sortField, String sortDir, String keyword);

    void deleteUser(Long id) throws ResourceNotFoundException;

    UserDTO createUser(UserDTO userDTO);

    void updateEnabled(Long id,boolean enabled) throws ResourceNotFoundException;

    Long countUser();
    List<UserDTO> listTrashedUsers();

    void updateTrashed(Long id, boolean trashed) throws ResourceNotFoundException;

    void trashUser(Long id) throws ResourceNotFoundException;


    UserDTO updateProfile(UpdateUserInfoRequest userProfile) throws ResourceNotFoundException;

    void switchTFAStatus(String email);

    void confirmEmail(String email);

    FullInfoUser fetchMe(User user);
}
