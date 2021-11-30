package org.moDgo.controller.member;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.moDgo.domain.EvaluationKind;

@Getter
@Setter
@NoArgsConstructor
public class MemberEvaluationRequestDto {
    private Long memberId;
    private EvaluationKind evaluationKind;
}
