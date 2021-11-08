package org.moDgo.controller.club;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ClubCreateRequestDto {
    private String userId;
    private String title;
    private String contents;
    private String imgUrl;
    private String startDate;
    private String endDate;
    private String tags;
    private int requitedPerson;
}
