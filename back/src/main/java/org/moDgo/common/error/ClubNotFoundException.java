package org.moDgo.common.error;

import org.moDgo.common.Messages;

public class ClubNotFoundException extends BusinessException{
    public ClubNotFoundException() {
        super(Messages.NO_CLUB_MESSAGE);
    }
}
