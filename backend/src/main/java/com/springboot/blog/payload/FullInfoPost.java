package com.springboot.blog.payload;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.springboot.blog.payload.user.UserSummary;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FullInfoPost {
    private Long id;
    private String title;
    private String slug;
    private String content;
    private String thumbnail;

    private UserSummary user;

    private boolean hot;
    private TagDTO tag;
    private String status;
    private int numOfComments;

//    private List<CommentDTO> comments ;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
}
