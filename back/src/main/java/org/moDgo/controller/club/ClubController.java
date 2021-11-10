package org.moDgo.controller.club;

import lombok.RequiredArgsConstructor;
import org.moDgo.domain.Club;
import org.moDgo.service.ClubService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/clubs")
public class ClubController {
    private final ClubService clubService;

    @PostMapping
    public ResponseEntity<ClubCreateRequestDto> createClub(
            @RequestBody ClubCreateRequestDto clubCreateRequestDto) {
        System.out.println("========================================");
        System.out.println("clubCreateRequestDto.getUserId() = " + clubCreateRequestDto.getUserId());
        System.out.println("clubCreateRequestDto.getRequiredPerson() = " + clubCreateRequestDto.getRequiredPerson());
        Club club = clubService.createClub(clubCreateRequestDto);
        return new ResponseEntity("모임 등록 완료. clubId : " + club.getId() + "", HttpStatus.OK);
    }
}
