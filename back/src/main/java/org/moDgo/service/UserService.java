package org.moDgo.service;

import org.moDgo.common.error.UserNotFoundException;
import org.moDgo.domain.Member;
import org.moDgo.domain.User;
import org.moDgo.repository.MemberRepository;
import org.moDgo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true) // -> 값을 변경하는 경우 해당 메서드 앞에 readonly 없는 @Transactional을 써준다
public class UserService {
    private final UserRepository userRepository;
    private final MemberRepository memberRepository;

    public UserService(UserRepository userRepository, MemberRepository memberRepository) {
        this.userRepository = userRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public User createUser(User user) {
        System.out.println("user.getTotalBadScore() = " + user.getTotalBadScore());
        return userRepository.save(user);
    }

    @Transactional
    public User searchUser(String userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Transactional
    public void updateTotalScore(String userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        List<Member> memberList = memberRepository.findAllByUser(user);
        int sumOfGood = 0;
        int sumOfBad = 0;
        int sumOfNormal = 0;
        for (Member member: memberList) {
            sumOfGood += member.getGood_manner();
            sumOfBad += member.getBad_manner();
            sumOfNormal += member.getNormal_manner();
        }
        
        user.changeTotalNum(sumOfGood,sumOfBad,sumOfNormal);
    }
}
