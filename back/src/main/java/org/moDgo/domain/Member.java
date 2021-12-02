package org.moDgo.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Table(name = "members")
@ToString
@Entity
public class Member {
    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ApprovalStatus approvalStatus; // 승인상태 [WAITING,CONFIRMED,DENIED]

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EvaluationStatus evaluationStatus; // 평가상태 [CLEAR,NOTCLEAR]

    private int good_manner = 0;

    private int normal_manner = 0;

    private int bad_manner = 0;

    @ColumnDefault("0")
    private int evaluation_num;

    @JoinColumn(name = "club_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private Club club;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @Builder
    public Member(User user
            , Club club
            ,ApprovalStatus approvalStatus
            ) {
        this.user = user;
        this.club = club;
        this.approvalStatus = approvalStatus;
        this.evaluationStatus = EvaluationStatus.NOTCLEAR;
        this.bad_manner = 0;
        this.good_manner = 0;
        this.normal_manner = 0;
    }

    public void changeBadMannerScore(int score) {
        this.bad_manner += score;
        this.evaluation_num++;
    }

    public void changeGoodMannerScore(int score) {
        this.good_manner += score;
        this.evaluation_num++;
    }
    public void changeNormalMannerScore(int score) {
        this.normal_manner += score;
        this.evaluation_num++;
    }
    public void changeApprovalStatus(ApprovalStatus approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public void changeEvaluationStatus(EvaluationStatus evaluationStatus) {
        this.evaluationStatus = evaluationStatus;
    }


}
