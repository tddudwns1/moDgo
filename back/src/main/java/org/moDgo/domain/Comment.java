package org.moDgo.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "comments")
@NoArgsConstructor
@ToString
public class Comment extends BaseTime{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(length = 500, nullable = false)
    private String contents;

    @Builder
    public Comment(Club club, String contents, User user) {
        this.club = club;
        this.contents = contents;
        this.user = user;
    }

    public void changeComment(String newComment) {
        this.contents = newComment;
    }


}
