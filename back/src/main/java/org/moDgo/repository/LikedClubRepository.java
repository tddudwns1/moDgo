package org.moDgo.repository;

import org.moDgo.domain.Club;
import org.moDgo.domain.LikedClub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikedClubRepository extends JpaRepository<LikedClub,Long>{
    void deleteByClub(Club club);
}
