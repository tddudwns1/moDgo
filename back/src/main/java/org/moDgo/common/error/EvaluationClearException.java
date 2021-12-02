package org.moDgo.common.error;

import org.moDgo.common.Messages;

public class EvaluationClearException extends BusinessException{
    public EvaluationClearException(){
        super(Messages.EVALUATION_CLEAR_MESSAGE);
    }
}
