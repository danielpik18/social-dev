import React, { useContext } from 'react';
import styles from './ConversationView.module.scss';
import { MessagesPopoverContext } from '../MessagesPopoverContext';
import { TextField } from '@material-ui/core';

const ConversationView = () => {
    const { currentConversation, userConversationsFormatted } = useContext(MessagesPopoverContext);

    return (
        <div className={styles.wrapper}>
            {
                console.log(currentConversation)
            }

            <div className={styles.textfieldWrapper}>
                <TextField
                    fullWidth
                    placeholder='Escribe un mensaje'
                />
            </div>
        </div>
    );
}

export default ConversationView;