package org.moDgo.controller.club;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.moDgo.domain.Club;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ClubCreateRequestDto {
    private String userId;
    private String title;
    private String contents;
    private String imgUrl;
    private String startDate;
    private String endDate;
    private String tags;
    private int requiredPerson;

    public Club toEntity() {
        return Club.builder()
                .title(title)
                .contents(contents)
                .imgUrl(imgUrl)
                .tags(tags)
                .requiredPerson(requiredPerson)
                .build();
    }
}
