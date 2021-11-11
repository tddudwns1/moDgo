package org.moDgo.common.error;

import org.moDgo.common.Messages;

public class CommentNotFoundException extends BusinessException{
    public CommentNotFoundException() {
        super(Messages.NO_COMMENT_MESSAGE);
    }
}