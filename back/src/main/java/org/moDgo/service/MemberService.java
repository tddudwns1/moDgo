package org.moDgo.service;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.moDgo.controller.member.MemberApproveRequestDto;
import org.moDgo.controller.member.MemberCreateRequestDto;
import org.moDgo.domain.Member;
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

    @Transactional
    public Member apply(MemberCreateRequestDto memberCreateRequestDto) {
        return new Member();
    }

    @Transactional
    public void deleteMember(String userId, Long clubId, String deleteStatus) {
    }

    @Transactional
    public void approveMember(MemberApproveRequestDto memberApproveRequestDto) {

    }

    //getMemberList
    //getJoiningClubList
    //getJoiningClubIds

}
