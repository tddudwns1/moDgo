package org.moDgo.controller.comment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.moDgo.domain.Comment;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CommentResponseDto {
    private Long id; // comment id
    private Long clubId;
    private String userId;
    private String userImgUrl;
    private String userName;
    private LocalDateTime createdAt; // 생성 날짜
    private LocalDateTime updatedAt; // 업데이트 날짜
    private String contents;

    public CommentResponseDto(Comment comment) {
        BeanUtils.copyProperties(comment, this);
        this.clubId = comment.getClub().getId();
        this.userId = comment.getUser().getId();
        this.userName = comment.getUser().getName();
        this.userImgUrl = comment.getUser().getImgUrl();
    }

}
