package org.moDgo.controller.comment;

import lombok.*;
import org.moDgo.domain.Comment;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentCreateRequestDto {

    private String userId; // 유저 아이디
    private Long clubId; // 모임 페이지 번호
    private String contents; // 댓글 내용


    public Comment toEntity() {
        return Comment.builder()
                .contents(contents)
                .build();
    }

}
