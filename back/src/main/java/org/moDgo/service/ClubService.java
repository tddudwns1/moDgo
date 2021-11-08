package org.moDgo.service;


import lombok.RequiredArgsConstructor;
import org.moDgo.repository.ClubRepository;
import org.moDgo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClubService {
    private final ClubRepository clubRepository;
    private final UserRepository userRepository;

}
