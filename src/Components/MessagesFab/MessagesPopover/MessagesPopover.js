import React, { useContext, useEffect, useState } from 'react';
import styles from './MessagesPopover.module.scss';
import { Grid, Tooltip, Badge, Fade, Zoom } from '@material-ui/core';
import { FaUserAlt, FaUserTie } from 'react-icons/fa';
import { AuthContext } from '../../../Contexts/AuthContext';
import { MessagesPopoverContext } from './MessagesPopoverContext';

import ReactLoading from 'react-loading';
import ConversationItem from './UnreadConversations/UnreadConversations';
import ConversationView from './ConversationView/ConversationView';
import UnreadConversations from './UnreadConversations/UnreadConversations';

const MessagesPopover = () => {
    const { currentUser } = useContext(AuthContext);
    const {
        currentView,
        userConversationsFormatted
    } = useContext(MessagesPopoverContext);

    return (
        <Zoom in>
            <div className={styles.wrapper}>
                <Grid container>
                    <Grid item xs={2}>
                        <div className={styles.messagesMenu}>
                            <Tooltip title='Mensajes de desarrolladores'>
                                <div className={styles.messagesMenuIcon}>
                                    <Badge
                                        color='secondary'
                                        variant='dot'
                                        badgeContent={1}
                                        className={styles.messagesMenuBadge}
                                    >
                                        <FaUserAlt />
                                    </Badge>
                                </div>
                            </Tooltip>
                            <Tooltip title='Mensajes de reclutadores'>
                                <div className={styles.messagesMenuIcon}>
                                    <Badge
                                        color='secondary'
                                        variant='dot'
                                        badgeContent={1}
                                        className={styles.messagesMenuBadge}
                                    >
                                        <FaUserTie />
                                    </Badge>
                                </div>
                            </Tooltip>
                        </div>
                    </Grid>

                    <Grid item xs={10}>
                        <div className={styles.messagesList}>
                            {
                                <div>
                                    {

                                        currentView === 'conversationsList'
                                            ? (
                                                <UnreadConversations />
                                            )
                                            : (
                                                <ConversationView />
                                            )
                                    }
                                </div>
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Zoom>
    );
}

export default MessagesPopover;