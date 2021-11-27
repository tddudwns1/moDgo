package org.moDgo.service;

import javassist.runtime.Desc;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.moDgo.common.error.ClubNotFoundException;
import org.moDgo.common.error.MemberNotFoundException;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Club club = clubRepository.findById(clubId).orElseThrow(ClubNotFoundException::new);
        Member member = memberRepository.findByUserAndClub(user, club).orElseThrow(MemberNotFoundException::new);
        memberRepository.delete(member);
    }

    @Transactional
    public void approveMember(MemberApproveRequestDto memberApproveRequestDto) {
        Member member = memberRepository.findById(memberApproveRequestDto.getMemberId()).orElseThrow(MemberNotFoundException::new);
        member.changeApprovalStatus(ApprovalStatus.CONFIRMED);
    }


    public Page<Member> getMemberList(String userId, Long clubId, ApprovalStatus approvalStatus, int page) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        // 한 명의 user가 n개의 club을 생성 가능하므로 clubId로 해당 club 접근
        Club club = clubRepository.findById(clubId).orElseThrow(ClubNotFoundException::new);
        System.out.println("club.getId() = " + club.getId());
        PageRequest pageRequest = PageRequest.of((page - 1), 4, Sort.by("id").descending());
        ApprovalStatus status = ApprovalStatus.DENIED;

        System.out.println("approvalStatus = " + approvalStatus);

        return memberRepository.findByClubAndApprovalStatus(club, approvalStatus, pageRequest);
    }


    public Page<Member> getJoiningClubList(String userId, int page) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        PageRequest pageRequest = PageRequest.of((page - 1), 3, Sort.by("id").descending());
        return memberRepository.findAllByUser(user, pageRequest);
    }


    public List<Long> getJoiningClubIds(String userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        List<Member> joiningClubList = memberRepository.findAllByUser(user);
        List<Long> joiningClubIdList = new ArrayList<>();

        for (Member member : joiningClubList) {
            joiningClubIdList.add(member.getClub().getId());
        }
        return joiningClubIdList;
    }


/*    public Page<Member> getMemberList(String userId,String approvalStatus, int page) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Club club = clubRepository.findByUser(user).orElseThrow(ClubNotFoundException::new);

        PageRequest pageRequest = PageRequest.of((page - 1), 3, Sort.by("id").descending());
        ApprovalStatus status;


        if (!approvalStatus.equals(ApprovalStatus.CONFIRMED.toString())) {
            if(approvalStatus.equals(ApprovalStatus.WAITING.toString())){
                status = ApprovalStatus.WAITING;
            }
            else {
                status = ApprovalStatus.DENIED;
            }
        } else {
            status = ApprovalStatus.CONFIRMED;
        }

        return memberRepository.findByClubAndApprovalStatus(club, status, pageRequest);

    }*/

}
