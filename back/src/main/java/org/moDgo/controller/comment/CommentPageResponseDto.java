package org.moDgo.controller.comment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CommentPageResponseDto {
    private List<CommentResponseDto> commentList;
    private Long totalCount;
    
    public CommentPageResponseDto(Long totalCount, List<CommentResponseDto> commentList) {
        this.totalCount = totalCount;
        this.commentList = commentList;
    }
}
