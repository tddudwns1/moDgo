package org.moDgo.controller.likedclub;

import lombok.*;
import org.moDgo.domain.ClubStatus;
import org.moDgo.domain.LikedClub;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikedClubResponseDto {

    private Long id;                    // '좋아요한 모임' 아이디
    private Long clubId;
    private String title;               // 모임 이름
    private String contents;            // 모임 소개
    private LocalDate startDate;        // 공유 시작 날짜
    private String imgUrl;              // 모임 썸네일 이미지
    private String tags;                // 모임 태그
    private int likes;                  // 모임 좋아요 수
    private ClubStatus clubStatus;      // 모임 모집여부
    private int currentPerson;          // 현재 인원


    public LikedClubResponseDto(LikedClub likedClub) {
            this.id = likedClub.getId();
            this.clubId = likedClub.getClub().getId();
            this.title = likedClub.getClub().getTitle();
            this.contents = likedClub.getClub().getContents();
            this.startDate = likedClub.getClub().getStartDate();
            this.imgUrl = likedClub.getClub().getImgUrl();
            this.tags = likedClub.getClub().getTags();
            this.likes = likedClub.getClub().getLikes();
            this.clubStatus = likedClub.getClub().getClubStatus();
            this.currentPerson = likedClub.getClub().getCurrentPerson();

    }
}
