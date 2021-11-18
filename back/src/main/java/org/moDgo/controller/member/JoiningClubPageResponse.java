package org.moDgo.controller.member;

import java.util.List;

public class JoiningClubPageResponse {
    private Long totalCount;
    private List<JoiningClubResponse> joiningClubList;

    public JoiningClubPageResponse(Long totalCount, List<JoiningClubResponse> joiningClubList) {
        this.totalCount = totalCount;
        this.joiningClubList = joiningClubList;
    }
}
