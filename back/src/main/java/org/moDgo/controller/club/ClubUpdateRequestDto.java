package org.moDgo.controller.club;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ClubUpdateRequestDto {
    private String title;
    private String contents;
    private int requiredPerson;
    private String startDate;
    private String endDate;
}
