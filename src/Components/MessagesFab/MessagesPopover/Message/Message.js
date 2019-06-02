import React from 'react';
import styles from './Message.module.scss';

const Message = ({ conversation, message, clicked }) => {
    return (
        <div
            className={styles.message}
            onClick={clicked && (() => clicked(conversation.id))}
        >
            <div className={styles.messageFrom}>
                <div
                    style={{
                        background: `url(${conversation.userWithImage ? conversation.userWithImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYm-KcyvHy3PDkmh0V9KzkUk26255h0RwthshiaoanTnfH2B_IRg'})`
                    }}
                    className={styles.messageFromUserImage}
                >
                </div>

                <div className={styles.messageFromUser}>
                    {conversation.userWithName}
                </div>
            </div>

            <div className={styles.messageContent}>
                {message.content}
            </div>
        </div>
    );
}

export default Message;