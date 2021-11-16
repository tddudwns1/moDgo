package org.moDgo.common.error;

import org.moDgo.common.Messages;

public class MemberNotFoundException extends BusinessException {
    public MemberNotFoundException() {
        super(Messages.NO_MEMBER_MESSAGE);
    }
}
