package org.moDgo.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@ToString
@Table(name ="likedclubs")
public class LikedClub {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @JoinColumn(name = "club_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private Club club;

    @Builder
    public LikedClub(User user, Club club) {
        this.user = user;
        this.club = club;
    }


}
