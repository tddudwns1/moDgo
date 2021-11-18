package org.moDgo.repository;

import org.moDgo.domain.ApprovalStatus;
import org.moDgo.domain.Club;
import org.moDgo.domain.Member;
import org.moDgo.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {
    Optional<Member> findByUserAndClub(User user, Club club);
    void deleteAllByClub(Club club);
    Page<Member> findByClubAndApprovalStatus(Club club, ApprovalStatus approvalStatus, Pageable pageable);
    Page<Member> findAllByUser(User user, Pageable pageable);
    List<Member> findAllByUser(User user);
}
