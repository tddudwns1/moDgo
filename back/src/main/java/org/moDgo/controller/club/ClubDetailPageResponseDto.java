package org.moDgo.controller.club;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ClubDetailPageResponseDto {
    private Long totalCount;
    private List<ClubDetailResponseDto> clubList;

    public ClubDetailPageResponseDto(Long totalCount, List<ClubDetailResponseDto> clubList) {
        this.totalCount = totalCount;
        this.clubList = clubList;
    }
}
