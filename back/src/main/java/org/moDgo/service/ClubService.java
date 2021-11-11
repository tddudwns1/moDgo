package org.moDgo.service;


import lombok.RequiredArgsConstructor;
import org.moDgo.common.error.ClubDuplicatedException;
import org.moDgo.common.error.ClubNotFoundException;
import org.moDgo.common.error.UserNotFoundException;
import org.moDgo.controller.club.ClubCreateRequestDto;
import org.moDgo.domain.Club;
import org.moDgo.domain.ClubKind;
import org.moDgo.domain.ClubStatus;
import org.moDgo.domain.User;
import org.moDgo.repository.ClubRepository;
import org.moDgo.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClubService {
    private final ClubRepository clubRepository;
    private final UserRepository userRepository;


    @Transactional
    public Club createClub(ClubCreateRequestDto requestDto) {
        Club club = requestDto.toEntity();
        setClubKind(club);
        List<Club> allClubByUserId = findAllClubByUserId(requestDto.getUserId());//이전까지 해당 사용자가 만든 모든 모임 List
        //동일한 OTT 서비스 모임 두개를 못 만들게 하는 예외 처리
        for (Club finds : allClubByUserId) {
            if (finds.getClubKind().equals(club.getClubKind())) {
                throw new ClubDuplicatedException();
            }
        }
        String stringStartDate = requestDto.getStartDate();
        String stringEndDate = requestDto.getEndDate();
        LocalDate startDate = LocalDate.parse(stringStartDate, DateTimeFormatter.ISO_LOCAL_DATE);
        LocalDate endDate = LocalDate.parse(stringEndDate, DateTimeFormatter.ISO_LOCAL_DATE);
        final Club newClub = convertToNewClub(club, requestDto.getUserId(), startDate, endDate);
        return clubRepository.save(newClub);
    }

    // Tags 에서 플랫폼 태그는 무조건 하나만 선택하도록 Front 단에서 예외 처리
    // 현재 만드려는 모임이 어떤 종류의 OTT 서비스를 공유 하기 위한 모임인지 설정
    public void setClubKind(Club club) {
        String tags = club.getTags();
        List<String> tagList = Arrays.asList(tags.split(","));
        if (tagList.contains("Netflix")) {
            club.changeClubKind(ClubKind.NETFLIX);
        } else if (tagList.contains("Watcha")) {
            club.changeClubKind(ClubKind.WATCHA);
        } else if (tagList.contains("Wave")) {
            club.changeClubKind(ClubKind.WAVE);
        } else if (tagList.contains("Desney")) {
            club.changeClubKind(ClubKind.DESNEY);
        }
    }

    public Club convertToNewClub(final Club club, final String userId,
                                 LocalDate startDate, LocalDate endDate) {
        final User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
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
                .clubKind(club.getClubKind())
                .currentPerson(1) // Club 생성 당시 현재인원  = 모임장 1명
                .build();
    }


    //현재일 기준 만료 => EXPIRED 로 변경
    private void changeClubStatus(Club club) {
        if (LocalDate.now().isAfter(club.getEndDate())) {
            club.changeStatus(ClubStatus.EXPIRED);//모집여부 상관없이 기한 지남
        }else if(club.getCurrentPerson() == club.getRequiredPerson()){
            club.changeStatus(ClubStatus.RECRUITED);//모집완료
        } else if (club.getCurrentPerson() < club.getRequiredPerson()) {
            club.changeStatus(ClubStatus.ACTIVE);//기한 내 모집중
        }
    }

    //모든 클럽에 대해서 만료 처리 메서드
    private void changeAllClubStatus() {
        List<Club> all = clubRepository.findAll();
        for (Club club : all) {
            changeClubStatus(club);
        }
    }

    //clud_id로 클럽 한개 찾기
    public Club findClubById(Long clubId) {
        Club club = clubRepository.findById(clubId).orElseThrow(ClubNotFoundException::new);
        changeClubStatus(club);
        return club;
    }

    //user_id로 해당 사용자가 만든 모든 클럽 찾기
    public List<Club> findAllClubByUserId(String userID) {
        User user = userRepository.findById(userID).orElseThrow(UserNotFoundException::new);
        return clubRepository.findAllByUser(user);
    }

    //user_id로 해당 사용자가 만든 모든 클럽 찾기 - Paging 사용을 위한 오버 로딩
    public Page<Club> findAllClubByUserId(String userId, int page) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        PageRequest pageRequest = PageRequest.of((page - 1), 3, Sort.by(Sort.Direction.DESC, "id"));
        return clubRepository.findAllByUser(user,pageRequest);
    }

    //모임 조회 -> tags or status
    public List<Club> findAllClubs(String tags,String clubStatus) {
        //Club 만료 여부 갱신
        changeAllClubStatus();

        List<Club> clubs = clubRepository.findAll();

        //모집 중 필터링
        if (!clubStatus.isEmpty()) {
            clubs.removeIf(club -> club.getClubStatus().equals(ClubStatus.EXPIRED));
            clubs.removeIf(club -> club.getClubStatus().equals(ClubStatus.RECRUITED));
        }

    }
}
