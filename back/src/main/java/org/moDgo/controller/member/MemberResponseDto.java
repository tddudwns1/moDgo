package org.moDgo.controller.member;

import org.moDgo.domain.ApprovalStatus;
import org.moDgo.domain.Member;
import org.springframework.beans.BeanUtils;

public class MemberResponseDto {
    private Long id;
    private Long clubId;
    private String userId;
    private String imgUrl;
    private String name;
    private String email;
    private ApprovalStatus approvalStatus;

    public MemberResponseDto(Member member) {
        BeanUtils.copyProperties(member, this);
        this.clubId = member.getClub().getId();
        this.userId = member.getUser().getId();
        this.imgUrl = member.getUser().getImgUrl();
        this.name = member.getUser().getName();
        this.email = member.getUser().getEmail();
    }
}
