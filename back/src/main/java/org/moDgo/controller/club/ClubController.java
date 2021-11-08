package org.moDgo.controller.club;

import lombok.RequiredArgsConstructor;
import org.moDgo.domain.Club;
import org.moDgo.service.ClubService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/clubs")
public class ClubController {
    private final ClubService clubService;

//    @PostMapping
//    public ResponseEntity<ClubCreateRequestDto> createClub(
//            ClubCreateRequestDto clubCreateRequestDto,
//            @RequestParam(value = "img", required = false) MultipartFile file
//    ) {
//        return "";
//    }
}
