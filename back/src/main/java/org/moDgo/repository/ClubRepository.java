package org.moDgo.repository;

import org.moDgo.domain.Club;
import org.moDgo.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClubRepository extends JpaRepository<Club,Long> {
    Club findByIdAndUser(Long id, User user);

    List<Club> findAllByUser(User user);

    Page<Club> findAllByUser(User user, Pageable pageable);
}
