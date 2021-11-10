package org.moDgo.common.error;

import org.moDgo.common.Messages;

public class ClubDuplicatedException extends BusinessException {
    public ClubDuplicatedException() {
        super(Messages.CLUB_DUP_MESSAGE);
    }

}
