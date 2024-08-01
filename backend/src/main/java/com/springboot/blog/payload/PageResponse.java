package com.springboot.blog.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageResponse<T> {
    private int pageNo;
    private int pageSize;
    private List<T> data;
    private long totalElements;
    private int totalPage;
    private boolean last;
}
