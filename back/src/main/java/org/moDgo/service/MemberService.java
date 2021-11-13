package org.moDgo.service;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.moDgo.repository.ClubRepository;
import org.moDgo.repository.MemberRepository;
import org.moDgo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final ClubRepository clubRepository;


}
