package org.moDgo.common.error;

import org.moDgo.common.Messages;

public class UserNotFoundException extends BusinessException{
    public UserNotFoundException() {
        super(Messages.NO_USER_MESSAGE);
    }
}
