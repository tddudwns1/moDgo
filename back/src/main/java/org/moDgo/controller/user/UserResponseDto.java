package org.moDgo.controller.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.moDgo.domain.User;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@NoArgsConstructor
public class UserResponseDto {
    private String id;
    private String email;
    private String name;
    private String imgUrl;
    private int totalGoodScore;
    private int totalBadScore;
    private int totalNormalScore;

    /*
    * Constructor를 이런식으로 오버라이딩을 하는 경우 생기는 문제점은 없을까??
    * BeanUtils.copyProperties => Entity의 filed명과 복사할 DTO 객체의 필드명이 동일해야함을 주의하자.
    * */

//    public UserResponseDto(User user,int goodScore,int badScore,int normalScore) {
//        BeanUtils.copyProperties(user,this);
//        this.badScore = badScore;
//        this.goodScore = goodScore;
//        this.normalScore = normalScore;
//    }

    public UserResponseDto(User user) {
        System.out.println("In UserResponseDto user.getTotalBadNum() = " + user.getTotalBadScore());
        BeanUtils.copyProperties(user,this);
    }
}
