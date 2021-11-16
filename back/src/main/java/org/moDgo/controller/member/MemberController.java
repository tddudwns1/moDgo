package org.moDgo.controller.member;


import lombok.RequiredArgsConstructor;
import org.moDgo.domain.Member;
import org.moDgo.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
