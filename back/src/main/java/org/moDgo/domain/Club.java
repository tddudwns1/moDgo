package org.moDgo.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Table(name = "clubs")
@ToString(exclude = {"members"})
@Entity
public class Club {
    @Id
    @Column(name = "club_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "club")
    List<Member> members = new ArrayList<Member>();

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private final Long remainDay = ChronoUnit.DAYS.between(startDate, LocalDate.now());

    @Column(nullable = false)
    private int requiredPerson;

    private int likes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClubStatus clubStatus;//    RECRUIT,ACTIVE,EXPIRED


}
