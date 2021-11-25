package org.moDgo.controller.likedclub;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.moDgo.domain.LikedClub;
import org.moDgo.service.LikedClubService;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/likedclubs")
@RequiredArgsConstructor
public class LikedClubController {

    private final LikedClubService likedClubService;

    // 좋아요한 모임 리스트에 추가
    @PostMapping
    public ResponseEntity<LikedClubResponseDto> createLikedClub(
            @RequestBody LikedClubCreateRequestDto likedClubRequestDto) {
        try {
            LikedClub likedClub = likedClubService.createLikedClub(likedClubRequestDto);
            return new ResponseEntity(
                    "해당 모임이 좋아요 리스트에 추가되었습니다. (likedClubId: " + likedClub.getId() + ")", HttpStatus.OK
            );
        } catch (Exception e) {
            return new ResponseEntity("이미 좋아요 리스트에 존재하는 모임입니다.", HttpStatus.BAD_REQUEST);
        }
    }

    // 좋아요한 모임 리스트에서 삭제
    @DeleteMapping
    public ResponseEntity<Void> deleteLikedClub(
            @RequestParam(value="clubId") Long clubId,
            @RequestParam(value = "userId") String userId) {
        likedClubService.deleteLikedClub(clubId, userId);
        return new ResponseEntity(
                "해당 모임이 좋아요 리스트에서 삭제되었습니다.", HttpStatus.OK
        );


    }

    // 사용자가 좋아요한 모임 모두 조회
    @GetMapping("/users/{userId}")
    public ResponseEntity<LikedClubPageResponseDto> getUserLikedClubs(
            @PathVariable("userId") String userId,
            @RequestParam(value="page",defaultValue = "1") int page) {

        Page<LikedClub> allUserLikedClubs = likedClubService.findAllUserLikedClubs(userId, page);
        Long totalCount = allUserLikedClubs.getTotalElements();

        List<LikedClubResponseDto> response = allUserLikedClubs
                .stream()
                .map(LikedClubResponseDto::new)
                .collect(Collectors.toList());


        LikedClubPageResponseDto likedClubPageResponseDto = new LikedClubPageResponseDto(totalCount, response);
        return new ResponseEntity(likedClubPageResponseDto, HttpStatus.OK);

    }

    // 사용자가 좋아요한 모임 아이디 모두 조회
    @GetMapping("/ids")
    public ResponseEntity<LikedClubIdListResponseDto> getUserLikedClubIds(
            @RequestParam("userId") String userId) {
        List<Long> likedClubIdList = likedClubService.getLikedClubIds(userId);
        LikedClubIdListResponseDto responseDto = new LikedClubIdListResponseDto(likedClubIdList);
        return new ResponseEntity(responseDto, HttpStatus.OK);
    }


}
