import React, { useContext } from 'react';
import styles from './ConversationCircle.module.scss';
import { ConversationViewContext } from './../../ConversationView/ConversationViewContext';

const ConversationCircle = ({ unreadMessagesNumber, userData, conversationID }) => {
    const { setCurrentConversationID } = useContext(ConversationViewContext);
    const userFirstName = userData.name.replace(/ .*/, '');
    const userFirstLastname = userData.lastname.replace(/ .*/, '');

    return (
        userData &&
        <div
            className={styles.circle}
            onClick={() => setCurrentConversationID(conversationID)}
        >
            <div className={styles.userImageWrapper}>
                <div
                    style={{
                        background: `url(${userData.profileImageURL})`
                    }}
                    className={styles.userImage}
                >
                </div>

                {
                    unreadMessagesNumber > 0 &&
                    <div className={styles.unreadMessages}>
                        {unreadMessagesNumber}
                    </div>
                }
            </div>

            <span className={styles.userName}>
                {`${userFirstName} ${userFirstLastname}`}
            </span>
        </div>
    );
}

export default ConversationCircle;