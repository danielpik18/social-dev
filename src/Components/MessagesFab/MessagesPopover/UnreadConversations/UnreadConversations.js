import React, { useContext } from 'react';
import { AuthContext } from '../../../../Contexts/AuthContext';
import styles from './UnreadConversations.module.scss';
import { MessagesPopoverContext } from '../MessagesPopoverContext';
import Message from '../Message/Message';

const UnreadConversations = () => {
    const { currentUser } = useContext(AuthContext);
    const {
        setCurrentConversationID,
        userConversationsFormatted
    } = useContext(MessagesPopoverContext);

    return (
        <div>
            {
                userConversationsFormatted &&
                userConversationsFormatted.map((conversation, index) => {
                    const unreadMessages = Object
                        .values(conversation.messages)
                        .filter(message =>
                            ((message.read === false) &&
                                (message.from !== currentUser.uid)));

                    const lastUnreadMessage = unreadMessages[unreadMessages.length - 1];

                    return (
                        lastUnreadMessage &&
                        (
                            <Message
                                key={index}
                                clicked={setCurrentConversationID}
                                conversation={conversation}
                                message={lastUnreadMessage}
                            />
                        )
                    )
                })
            }
        </div>
    )
}

export default UnreadConversations;