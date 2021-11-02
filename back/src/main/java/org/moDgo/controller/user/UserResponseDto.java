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

    public UserResponseDto(User user) {
        BeanUtils.copyProperties(user,this);
    }
}
