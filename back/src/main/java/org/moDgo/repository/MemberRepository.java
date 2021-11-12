package org.moDgo.repository;

import org.moDgo.domain.Club;
import org.moDgo.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {
    void deleteAllByClub(Club club);
}
