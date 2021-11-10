package org.moDgo.controller.club;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.moDgo.domain.Club;
import org.moDgo.domain.ClubStatus;
import org.springframework.beans.BeanUtils;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class ClubDetailResponseDto {
    private Long id;
    private String userId;
    private String title;
    private String contents;
    private String imgUrl;
    private int requiredPerson;
    private int currentPerson;
    private String tags;
    private int likes;
    private ClubStatus clubStatus;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long remainDays;

    public ClubDetailResponseDto(Club club) {
        BeanUtils.copyProperties(club, this);
        this.userId = club.getUser().getId();
    }
}
