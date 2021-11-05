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
    @Column(name = "memer_id")
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
    @ManyToOne
    private Club club;

    @JoinColumn(name = "user_id")
    @ManyToOne
    private User user;

    @Builder
    public Member(User user
            , Club club
            ,ApprovalStatus approvalStatus
            ,EvaluationStatus evaluationStatus
            ,int bad_manner
            ,int good_manner
            ,int normal_manner) {
        this.user = user;
        this.club = club;
        this.approvalStatus = approvalStatus;
        this.evaluationStatus = evaluationStatus;
        this.bad_manner = bad_manner;
        this.good_manner = good_manner;
        this.normal_manner = normal_manner;
    }

    public void changeApprovalStatus(ApprovalStatus approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public void changeEvaluationStatus(EvaluationStatus evaluationStatus) {
        this.evaluationStatus = evaluationStatus;
    }

    public void addGoodManner() {
        this.good_manner++;
    }

    public void addBadManner() {
        this.bad_manner++;
    }

    public void addNormalManner() {
        this.normal_manner++;
    }

}
