package org.moDgo.controller.member;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.moDgo.domain.EvaluationStatus;

@Getter
@Setter
@NoArgsConstructor
public class MemberEvaluationResponseDto {
    int goodScore;
    int badScore;
    int normalScore;
    EvaluationStatus evaluationStatus;

    /*
    * fix : BeanUtils.copyProperties()로 변경하기
    * */

    MemberEvaluationResponseDto(int badScore, int goodScore, int normalScore, EvaluationStatus evaluationStatus) {
        this.badScore = badScore;
        this.evaluationStatus = evaluationStatus;
        this.goodScore = goodScore;
        this.normalScore = normalScore;
    }
}
