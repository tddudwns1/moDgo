package org.moDgo.common.error;

public class BusinessException extends RuntimeException{
    protected BusinessException(String message) {
        super(message);
    }
}
