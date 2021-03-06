import React, { useContext, useEffect } from 'react';
import styles from './MessagesPopover.module.scss';
import { Grid, Tooltip, Zoom } from '@material-ui/core';
import { FaUserAlt, FaUserTie } from 'react-icons/fa';
import { MdChat } from 'react-icons/md';
import { MessagesPopoverContext } from './MessagesPopoverContext';
import ConversationView from './ConversationView/ConversationView';
import UnreadConversations from './UnreadConversations/UnreadConversations';
import { UnreadConversationsProvider } from './UnreadConversations/UnreadConversationsContext';

const MessagesPopover = () => {
    const {
        currentView,
        setCurrentView,
        setSortUnreadConversationsBy,
        devConversationsUnreadMessages,
        recConversationsUnreadMessages
    } = useContext(MessagesPopoverContext);

    useEffect(() => {
        return () => {
            /* eslint-disable */
            setCurrentView('conversationsList');
        }
    }, []);

    return (
        <Zoom in>
            <div className={styles.wrapper}>
                <Grid container>
                    <Grid item xs={1}>
                        <div className={styles.messagesMenu}>
                            <Tooltip title='Mensajes de desarrolladores'>
                                <div
                                    className={styles.messagesMenuIcon}
                                    onClick={() => {
                                        setSortUnreadConversationsBy('devs')
                                        setCurrentView('conversationsList')
                                    }}
                                >
                                    {
                                        devConversationsUnreadMessages &&
                                        <MdChat className={styles.messagesMenuIconBadge} />
                                    }
                                    <FaUserAlt />
                                </div>
                            </Tooltip>
                            <Tooltip title='Mensajes de reclutadores'>
                                <div
                                    className={styles.messagesMenuIcon}
                                    onClick={() => {
                                        setSortUnreadConversationsBy('recs');
                                        setCurrentView('conversationsList');
                                    }}
                                >
                                    {
                                        recConversationsUnreadMessages &&
                                        <MdChat className={styles.messagesMenuIconBadge} />
                                    }
                                    <FaUserTie />
                                </div>
                            </Tooltip>
                        </div>
                    </Grid>

                    <Grid item xs={11}>
                        <div className={styles.messagesList}>
                            <UnreadConversationsProvider>
                                {
                                    currentView === 'conversationsList' && (
                                        <UnreadConversations />
                                    )
                                }
                            </UnreadConversationsProvider>

                            {
                                currentView === 'conversation'
                                && (
                                    <ConversationView />
                                )
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Zoom>
    );
}

export default MessagesPopover;