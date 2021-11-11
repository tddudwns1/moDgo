package org.moDgo.service;

import lombok.RequiredArgsConstructor;
import org.moDgo.common.error.ClubNotFoundException;
import org.moDgo.common.error.CommentNotFoundException;
import org.moDgo.common.error.UserNotFoundException;
import org.moDgo.controller.comment.CommentCreateRequestDto;
import org.moDgo.controller.comment.CommentUpdateRequestDto;
import org.moDgo.domain.Club;
import org.moDgo.domain.Comment;
import org.moDgo.domain.User;
import org.moDgo.repository.ClubRepository;
import org.moDgo.repository.CommentRepository;
import org.moDgo.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ClubRepository clubRepository;

    // 댓글 작성
    @Transactional
    public Comment createComment(CommentCreateRequestDto commentCreateRequestDto) {
        Comment comment = commentCreateRequestDto.toEntity();
        String userId = commentCreateRequestDto.getUserId();
        Long clubId = commentCreateRequestDto.getClubId();

        final Comment newComment = convertToComment(comment,userId,clubId);
        return commentRepository.save(newComment);

    }

    private Comment convertToComment(final Comment comment, final String userId, final Long clubId) {
        final User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        final Club club = clubRepository.findById(clubId)
                .orElseThrow(ClubNotFoundException::new);

        return Comment.builder()
                .contents(comment.getContents())
                .club(club)
                .user(user)
                .build();

    }

    // 댓글 수정
    @Transactional
    public void updateComment(CommentUpdateRequestDto commentUpdateRequestDto, Long commentId) {
        String contents = commentUpdateRequestDto.getContents();
        final Comment comment = commentRepository.findById(commentId)
                .orElseThrow(CommentNotFoundException::new);

        comment.changeComment(contents);
    }

    // 댓글 삭제
    @Transactional
    public void deleteComment(final Long commentId) {
        final Comment comment = commentRepository.findById(commentId)
                .orElseThrow(CommentNotFoundException::new);

        commentRepository.delete(comment);
    }

    // 한 클럽(clubId)의 모든 댓글 찾기
    public Page<Comment> findAllClubComments(Long clubId, int page) {
        PageRequest pageRequest = PageRequest.of((page - 1), 5, Sort.by(Sort.Direction.DESC, "id"));
        return commentRepository.findAllByClubId(clubId, pageRequest);
    }

    // 한 사용자(userId)의 모든 댓글 찾기
    public Page<Comment> findAllUserComments(String userId, int page) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        PageRequest pageRequest = PageRequest.of((page - 1), 10, Sort.by(Sort.Direction.DESC, "id"));
        return commentRepository.findAllByUser(user, pageRequest);
    }


}
