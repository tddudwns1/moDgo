package org.moDgo.domain;

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

    public Comment(Long id, Club club, String contents) {
        this.id = id;
        this.club = club;
        this.contents = contents;
    }

    public void changeComment(String newComment) {
        this.contents = newComment;
    }


}
