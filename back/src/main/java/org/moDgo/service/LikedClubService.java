package org.moDgo.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.moDgo.common.error.ClubNotFoundException;
import org.moDgo.common.error.UserNotFoundException;
import org.moDgo.controller.likedclub.LikedClubCreateRequestDto;
import org.moDgo.domain.Club;
import org.moDgo.domain.LikedClub;
import org.moDgo.domain.User;
import org.moDgo.repository.ClubRepository;
import org.moDgo.repository.LikedClubRepository;
import org.moDgo.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LikedClubService {
    private final LikedClubRepository likedClubRepository;
    private final UserRepository userRepository;
    private final ClubRepository clubRepository;

    // 좋아요한 모임에 추가
    @Transactional
    public LikedClub createLikedClub(LikedClubCreateRequestDto likedClubCreateRequestDto) {
        final User user = userRepository.findById(likedClubCreateRequestDto.getUserId())
                .orElseThrow(UserNotFoundException::new);
        final Club club = clubRepository.findById(likedClubCreateRequestDto.getClubId())
                .orElseThrow(ClubNotFoundException::new);

        // 이미 좋아요를 누른 모임일 경우
        if(likedClubRepository.findByClubAndUser(club, user)!=null) {
            // delete LikedClub? => deleteLikedClub(club.getId(),user.getId())
            return null;
        }

        // 해당 모임의 좋아요 수 1 증가
        club.changeLikes(club.getLikes()+1);

        LikedClub newLikedClub = LikedClub.builder()
                .user(user)
                .club(club)
                .build();

        return likedClubRepository.save(newLikedClub);
    }

    // 사용자(userId)의 좋아요한 모임에서 하나의 모임(clubId) 삭제
    @Transactional
    public void deleteLikedClub(Long clubId, String userId) {
        final User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        final Club club = clubRepository.findById(clubId)
                .orElseThrow(ClubNotFoundException::new);

        // 해당 모임의 좋아요 수 1 감소
        club.changeLikes(club.getLikes()-1);

        likedClubRepository.deleteByClub(club);
    }

    // 한 사용자(userId)가 좋아요한 모임 모두 찾기
    @Transactional
    public Page<LikedClub> findAllUserLikedClubs(String userId, int page) {
        final User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        PageRequest pageRequest = PageRequest.of((page - 1), 10, Sort.by(Sort.Direction.DESC, "id"));

        return likedClubRepository.findAllByUser(user, pageRequest);
    }

    // 한 사용자(userId)가 좋아요한 모임의 '모임 아이디' 모두 찾기
    @Transactional(readOnly = true)
    public List<Long> getLikedClubIds(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);

        List<LikedClub> likedClubList = likedClubRepository.findAllByUser(user);
        List<Long> likedClubIdList = new ArrayList<>();

        for (LikedClub likedClub : likedClubList) {
            likedClubIdList.add(likedClub.getClub().getId());
        }
        return likedClubIdList;
    }


}
