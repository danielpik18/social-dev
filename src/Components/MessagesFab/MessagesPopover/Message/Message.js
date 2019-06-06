import React, { useContext, useEffect } from 'react';
import styles from './Message.module.scss';
import cssColors from './../../../../scss/_colors.scss';

import { formatDateAMPM } from './../../../../utils/misc';
import { MessagesPopoverContext } from '../MessagesPopoverContext';
import { AuthContext } from '../../../../Contexts/AuthContext';
import { ConversationViewContext } from './../ConversationView/ConversationViewContext';
import { reBase } from '../../../../firebase';

const Message = ({
    userData,
    message,
    clicked }) => {
    const { currentUser } = useContext(AuthContext);
    const { currentView } = useContext(MessagesPopoverContext);
    const { currentConversationID } = useContext(ConversationViewContext);

    const messageSentByCurrentUser = currentUser.uid === message.from;

    const dateSent = new Date(message.dateSent);
    const timeSent = formatDateAMPM(dateSent);

    useEffect(() => {
        if (message.hasOwnProperty('read')) {
            reBase.update(`users/${currentUser.uid}/conversations/${currentConversationID}/messages/${message.id}`, {
                data: {
                    read: true
                }
            })
        }
    });

    return (
        <div
            className={`${styles.message} ${clicked && styles.messageHover}`}
            style={
                (currentView === 'conversation')
                    ? ({
                        marginLeft: !messageSentByCurrentUser && '2rem',
                        marginRight: messageSentByCurrentUser && '2rem'
                    })
                    : (
                        {}
                    )
            }
        >
            <div
                className={styles.messageFrom}
                style={{
                    backgroundColor: messageSentByCurrentUser && cssColors.blueLight
                }}
            >
                <div className={styles.messageFromUser}>
                    {
                        currentView === 'conversationsList' && (
                            <div className={styles.messageFromUserImage}>
                            </div>
                        )
                    }

                    <div
                        className={styles.messageFromUser}
                        style={{
                            color: (
                                messageSentByCurrentUser
                                    ? cssColors.white
                                    : cssColors.greyDark
                            )
                        }}
                    >
                        {
                            !messageSentByCurrentUser ?
                                (
                                    userData.name.length > 20
                                        ? `${userData.name.slice(0, 20)}...`
                                        : userData.name
                                )
                                : 'Tú'
                        }
                    </div>
                </div>

                <div
                    className={styles.messageSentTime}
                    style={{
                        color: messageSentByCurrentUser ? cssColors.white : cssColors.grey
                    }}
                >
                    {timeSent}
                </div>
            </div>

            <div className={styles.messageContent}>
                {message.content}
            </div>
        </div >
    );
}

export default Message;