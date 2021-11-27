package org.moDgo.controller.club;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.moDgo.domain.Club;
import org.moDgo.domain.ClubStatus;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@NoArgsConstructor
public class ClubResponseDto {
    private Long id;
    private String title;
    private String contents;
    private String imgUrl;
    private Long remainDays;
    private String tags;
    private ClubStatus clubStatus;

    public ClubResponseDto(Club club) {
        BeanUtils.copyProperties(club, this);
    }
}
