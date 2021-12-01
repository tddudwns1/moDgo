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
    private int goodScore;
    private int badScore;
    private int normalScore;

    //Score Update용
    public UserResponseDto(User user,int goodScore,int badScore,int normalScore) {
        BeanUtils.copyProperties(user,this);
        this.badScore = badScore;
        this.goodScore = goodScore;
        this.normalScore = normalScore;
    }

    public UserResponseDto(User user) {
        BeanUtils.copyProperties(user,this);
    }
}
