package org.moDgo.repository;

import org.moDgo.domain.Club;
import org.moDgo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClubRepository extends JpaRepository<Club,Long> {
    Optional<Club> findByUser(User user);
}
