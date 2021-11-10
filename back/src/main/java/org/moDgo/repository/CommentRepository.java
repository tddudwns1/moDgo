package org.moDgo.repository;

import org.moDgo.domain.Club;
import org.moDgo.domain.Comment;
import org.moDgo.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;


@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    void deleteAllByClub(Club club);

    Page<Comment> findAllByUser(User user, Pageable pageable);

    Page<Comment> findAllByClubId(Long clubId, Pageable pageable);
}