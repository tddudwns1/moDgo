package org.moDgo.service;


import lombok.RequiredArgsConstructor;
import org.moDgo.common.error.UserNotFoundException;
import org.moDgo.controller.club.ClubCreateRequestDto;
import org.moDgo.domain.Club;
import org.moDgo.domain.ClubStatus;
import org.moDgo.domain.User;
import org.moDgo.repository.ClubRepository;
import org.moDgo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClubService {
    private final ClubRepository clubRepository;
    private final UserRepository userRepository;


    @Transactional
    public Club createClub(ClubCreateRequestDto requestDto) {
        /*
        * 넷플 => 넷플 두개 못 만들게 예외 처리 필요
        * */
        Club club = requestDto.toEntity();
        String stringStartDate = requestDto.getStartDate();
        String stringEndDate = requestDto.getEndDate();
        LocalDate startDate = LocalDate.parse(stringStartDate, DateTimeFormatter.ISO_LOCAL_DATE);
        LocalDate endDate = LocalDate.parse(stringEndDate, DateTimeFormatter.ISO_LOCAL_DATE);
        final Club newClub = convertToNewClub(club, requestDto.getUserId(), startDate, endDate);
        return clubRepository.save(newClub);
    }

    public Club convertToNewClub(final Club club, final String userId,
                                 LocalDate startDate, LocalDate endDate) {
        final User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        System.out.println("club.getRequiredPerson() = " + club.getRequiredPerson());
        return Club.builder()
                .user(user)
                .title(club.getTitle())
                .contents(club.getContents())
                .imgUrl(club.getImgUrl())
                .requiredPerson(club.getRequiredPerson())
                .startDate(startDate)
                .endDate(endDate)
                .tags(club.getTags())
                .likes(0)
                .remainDays(ChronoUnit.DAYS.between(LocalDate.now(), endDate))
                .clubStatus(ClubStatus.ACTIVE)
                .build();
    }

}
