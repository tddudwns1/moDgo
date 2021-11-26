package org.moDgo.controller.club;

import lombok.RequiredArgsConstructor;
import org.moDgo.domain.Club;
import org.moDgo.service.ClubService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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
        System.out.println("clubCreateRequestDto = " + clubCreateRequestDto);
        Club club = clubService.createClub(clubCreateRequestDto);
        return new ResponseEntity("모임 등록 완료. clubId : " + club.getId() + "", HttpStatus.OK);
    }

    //모임 리스트 조회
    @GetMapping
    public ResponseEntity<ClubPageResponseDto> getClubs(
            @RequestParam(value="tags") String tags,
            @RequestParam(value = "clubStatus") String clubStatus,
            @PageableDefault(size = 6) Pageable pageable
    ) {
        List<Club> allClubs = clubService.findAllClubs(tags, clubStatus);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), allClubs.size());
        Page<Club> page = new PageImpl<>(allClubs.subList(start, end), pageable, allClubs.size());
        List<ClubResponseDto> responseDtoList = page.stream().map(ClubResponseDto::new).collect(Collectors.toList());
        ClubPageResponseDto pageResponseDto = new ClubPageResponseDto((long) allClubs.size(), responseDtoList);
        return new ResponseEntity<>(pageResponseDto, HttpStatus.OK);
    }

    //모임 상세조회
    @GetMapping("/{clubId}")
    public ResponseEntity<ClubDetailResponseDto> getClubDetail(
            @PathVariable Long clubId
    ) {
        return ResponseEntity.ok(
                new ClubDetailResponseDto(clubService.findClubById(clubId))
        );
    }

    //사용자가 만든 모임들 조회(최대 4개)
    @GetMapping("/users/{userId}")
    public ResponseEntity<ClubDetailResponseDto> getUserClub(
            @PathVariable String userId,@RequestParam("page") int page
    ) {
        Page<Club> allClubsByUserId = clubService.findAllClubByUserId(userId, page);
        Long totalCount = allClubsByUserId.getTotalElements();
        List<ClubResponseDto> response = allClubsByUserId.stream().map(ClubResponseDto::new)
                .collect(Collectors.toList());

        ClubPageResponseDto detailPageResponseDto = new ClubPageResponseDto(totalCount, response);
        return new ResponseEntity(detailPageResponseDto, HttpStatus.OK);
    }
    //모임 삭제
    @DeleteMapping("/users/{clubId}")
    public ResponseEntity<Void> deleteClub(
            @PathVariable String clubId
    ) {
        Long id = Long.parseLong(clubId);
        clubService.deleteClub(id);
        return new ResponseEntity("모임 삭제가 완료되었습니다.", HttpStatus.OK);
    }

    //모임 수정(in 마이페이지)
    @PutMapping("/users/{clubId}")
    public ResponseEntity<Void> updateClub(
            ClubUpdateRequestDto requestDto,
            @PathVariable String clubId
    ) {
        long id = Long.parseLong(clubId);
        try {
            clubService.updateClub(requestDto, id);
            return new ResponseEntity("모임 수정 완료되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

}
