package org.moDgo.domain;

public enum ClubStatus {
    // EXPIRED => 무조건 현재 날짜 기준 마감일이 지난 상태(모집 정원과 상관없음)
    // ACTIVE => 마감일은 지나지 않고, 정원 모집 중
    // RECRUITED => 마감일은 지나지 않고, 정원 모집 완료
    ACTIVE,EXPIRED,RECRUITED
}
