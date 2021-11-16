package org.moDgo.service;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.moDgo.common.error.ClubNotFoundException;
import org.moDgo.common.error.UserNotFoundException;
import org.moDgo.controller.member.MemberApproveRequestDto;
import org.moDgo.controller.member.MemberCreateRequestDto;
import org.moDgo.domain.ApprovalStatus;
import org.moDgo.domain.Club;
import org.moDgo.domain.Member;
import org.moDgo.domain.User;
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
        User user = userRepository.findById(memberCreateRequestDto.getUserId()).orElseThrow(UserNotFoundException::new);
        Club club = clubRepository.findById(memberCreateRequestDto.getClubId()).orElseThrow(ClubNotFoundException::new);
        if (memberRepository.findByUserAndClub(user, club).isPresent()) {
            return null;
        }
        Member member = Member.builder().user(user).club(club).approvalStatus(ApprovalStatus.WAITING).build();
        return memberRepository.save(member);
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
