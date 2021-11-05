package org.moDgo.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@NoArgsConstructor
@Table(name = "users")
@ToString(exclude = {"club", "memberList", "likedClubList", "commentList"})
@Getter
public class User {
    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(length = 500, nullable = false)
    private String imgUrl;

    @Builder //생성자에 @Builder 를 설정하게되면 해당 생성자를 사용하는 Builder 가 생성되어 의미있는 객체만 생성할 수 있음
    public User(final String id, final String name, final String email, final String imgUrl) { //변수에 final -> 이 변수는 수정 불가
        this.id = id;
        this.email = email;
        this.name = name;
        this.imgUrl = imgUrl;
    }
}
