package org.moDgo.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Table(name = "clubs")
@ToString(exclude = {"members","comments"})
@Entity
public class Club extends BaseTime{
    @Id
    @Column(name = "club_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "club")
    List<Member> members = new ArrayList<>();

    @OneToMany(mappedBy = "club")
    List<Comment> comments = new ArrayList<>();

    @Column(nullable = false)
    private String title ;

    @Column(nullable = false)
    private String tags;

    @Column(nullable = false)
    private String imgUrl;

    @Column(nullable = false)
    private String contents;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private Long remainDays;

    @Column(nullable = false)
    private int requiredPerson;

    private int likes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClubStatus clubStatus;//    RECRUIT,ACTIVE,EXPIRED

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClubKind clubKind;

    @Builder // pk, list 제외 모든 속성
    public Club(User user, String title, String contents,
                String imgUrl, LocalDate startDate, LocalDate endDate,
                Long remainDays, int requiredPerson, int likes,
                ClubStatus clubStatus, String tags, ClubKind clubKind) {
        this.user = user;
        this.title = title;
        this.contents = contents;
        this.imgUrl = imgUrl;
        this.startDate = startDate;
        this.endDate = endDate;
        this.remainDays = remainDays;
        this.requiredPerson = requiredPerson;
        this.likes = likes;
        this.clubStatus = clubStatus;
        this.tags = tags;
        this.clubKind = clubKind;
    }

    public void changeLikes(int likes) {
        this.likes = likes;
    }

    public void updateClub(String title,String contents, String imgUrl,
                           LocalDate startDate, LocalDate endDate,
                           int requiredPerson, int likes, ClubStatus clubStatus,
                           String tags) {
        this.title = title;
        this.contents = contents;
        this.imgUrl = imgUrl;
        this.startDate = startDate;
        this.endDate = endDate;
        this.requiredPerson = requiredPerson;
        this.likes = likes;
        this.clubStatus = clubStatus;
        this.tags = tags;

    }

    public void changeClubKind(ClubKind clubKind) {
        this.clubKind = clubKind;
    }
    public void changeStatus(ClubStatus clubStatus) {
        this.clubStatus = clubStatus;
    }

}
