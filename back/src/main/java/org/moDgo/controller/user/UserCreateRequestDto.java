package org.moDgo.controller.user;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.moDgo.domain.User;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateRequestDto {
    private String id;
    private String email;
    private String name;
    private String imgUrl;

    public User toEntity() {
        return User.builder()
                .id(id)
                .name(name)
                .email(email)
                .imgUrl(imgUrl)
                .totalBadScore(0)
                .totalNormalScore(0)
                .totalGoodScore(0)
                .build();
    }
}
