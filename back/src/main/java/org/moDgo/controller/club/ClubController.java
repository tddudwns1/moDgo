package org.moDgo.controller.club;

import lombok.RequiredArgsConstructor;
import org.moDgo.domain.Club;
import org.moDgo.service.ClubService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/clubs")
public class ClubController {
    private final ClubService clubService;

    @PostMapping
    public ResponseEntity<ClubCreateRequestDto> createClub(
            @RequestBody ClubCreateRequestDto clubCreateRequestDto) {
        Club club = clubService.createClub(clubCreateRequestDto);
        return new ResponseEntity("모임 등록 완료. clubId : " + club.getId() + "", HttpStatus.OK);
    }

    //모임 리스트 조회
//    @GetMapping
//    public ResponseEntity<ClubPageResponseDto> getClubs(
//            @RequestParam(value="tags") String tags,
//            @RequestParam(value = "clubStatus") String clubStatus,
//            @PageableDefault(size = 6) Pageable pageable
//    ) {
//    }

    //모임 상세조회
    @GetMapping("/{clubId}")
    public ResponseEntity<ClubDetailResponseDto> getClubDetail(
            @PathVariable Long clubId
    ) {
        return ResponseEntity.ok(
                new ClubDetailResponseDto(clubService.findClubById(clubId))
        );
    }

    //사용자가 만든 모임 조회
    @GetMapping("/users/{userId}")
    public ResponseEntity<ClubDetailResponseDto> getUserClub(
            @PathVariable String userId,@RequestParam("page") int page
    ) {
        Page<Club> allClubsByUserId = clubService.findAllClubByUserId(userId, page);
        Long totalCount = allClubsByUserId.getTotalElements();
        List<ClubDetailResponseDto> response = allClubsByUserId.stream().map(ClubDetailResponseDto::new)
                .collect(Collectors.toList());

        ClubDetailPageResponseDto detailPageResponseDto = new ClubDetailPageResponseDto(totalCount, response);
        return new ResponseEntity(detailPageResponseDto, HttpStatus.OK);
    }

}
