package org.moDgo.controller.member;


import lombok.RequiredArgsConstructor;
import org.moDgo.domain.ApprovalStatus;
import org.moDgo.domain.Member;
import org.moDgo.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    //상세페이지에서 참여신청으로 해당 REST API 사용
    @PostMapping
    public ResponseEntity<MemberResponseDto> memberApply(
            @RequestBody MemberCreateRequestDto memberCreateRequestDto
    ) {
        try {
            Member member = memberService.apply(memberCreateRequestDto);
            return new ResponseEntity("참여신청이 완료되었습니다." + member.getId(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("이미 참여신청하셨습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ResponseEntity<MemberResponseDto> memberDeny(
            @RequestParam("userId") String userId,
            @RequestParam("clubId") Long clubId,
            @RequestParam("delete") String deleteStatus
    ) {
        memberService.deleteMember(userId, clubId, deleteStatus);
        return new ResponseEntity("참여 취소가 완료 되었습니다.", HttpStatus.OK);
    }

    //참여 승인에 사용
    @PutMapping
    public ResponseEntity<MemberResponseDto> memberApprove(
            @RequestBody MemberApproveRequestDto memberApproveRequestDto
    ) {
        memberService.approveMember(memberApproveRequestDto);
        return new ResponseEntity("참여가 승인되었습니다.", HttpStatus.OK);
    }

    // 승인 대기자(WAITING), 참여자(CONFIRMED), 승인 거부자(DENIED) 조회
    @GetMapping
    public ResponseEntity<MemberPageResponseDto> getMembers(
            @RequestParam("userId") String userId,
            @RequestParam("clubId") Long clubId,
            @RequestParam("approvalStatus") ApprovalStatus approvalStatus,
            @RequestParam("page") int page) {

        System.out.println("clubId = " + clubId);

        Page<Member> allMembers = memberService.getMemberList(userId, clubId, approvalStatus, page);
        Long totalCount = allMembers.getTotalElements();

        List<MemberResponseDto> response = allMembers
                .stream()
                .map(MemberResponseDto::new)
                .collect(Collectors.toList());
        for (MemberResponseDto dto:response
             ) {

        }
        System.out.println("response = " + response);
        MemberPageResponseDto memberPageResponseDto = new MemberPageResponseDto(totalCount, response);
        return new ResponseEntity(memberPageResponseDto, HttpStatus.OK);
    }

    // 참여중인 모임 조회
    @GetMapping("/users/{userId}")
    public ResponseEntity<JoiningClubPageResponse> getJoiningClubs(
            @PathVariable("userId") String userId,
            @RequestParam(value="page",defaultValue = "1")  int page) {
        System.out.println("userId = " + userId);
        Page<Member> allJoiningClubs = memberService.getJoiningClubList(userId, page);
        Long totalCount = allJoiningClubs.getTotalElements();
        List<JoiningClubResponse> response = allJoiningClubs
                .stream()
                .map(JoiningClubResponse::new)
                .collect(Collectors.toList());
        System.out.println("response = " + response);
        JoiningClubPageResponse joiningClubPageResponse = new JoiningClubPageResponse(totalCount, response);
        return new ResponseEntity(joiningClubPageResponse, HttpStatus.OK);
    }

    //참여중인 모임 아이디 조회
    @GetMapping("/ids")
    public ResponseEntity<JoiningClubIdListResponseDto> getJoiningClubIds(
            @RequestParam("userId") String userId) {
        List<Long> joiningClubIdList = memberService.getJoiningClubIds(userId);
        System.out.println("joiningClubIdList = " + joiningClubIdList);
        JoiningClubIdListResponseDto responseDto = new JoiningClubIdListResponseDto(joiningClubIdList);

        return new ResponseEntity(responseDto, HttpStatus.OK);
    }

}
