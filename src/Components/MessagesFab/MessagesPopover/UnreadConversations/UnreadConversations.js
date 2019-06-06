import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../Contexts/AuthContext';
import styles from './UnreadConversations.module.scss';
import ReactLoading from 'react-loading';
import { UnreadConversationsContext } from './UnreadConversationsContext';
import { reBase } from '../../../../firebase';
import ConversationCircle from './ConversationCircle/ConversationCircle';
import { MessagesPopoverContext } from '../MessagesPopoverContext';

const UnreadConversations = () => {
    const { currentUserData } = useContext(AuthContext);
    const {
        conversationsUserData,
        setConversationsUserData
    } = useContext(UnreadConversationsContext);
    const { sortUnreadConversationsBy, setDevConversationsUnreadMessages, setRecConversationsUnreadMessages } = useContext(MessagesPopoverContext);

    const [conversationWithDevs, setConversationWithDevs] = useState([]);
    const [conversationWithRecs, setConversationWithRecs] = useState([]);
    const [renderedConversations, setRenderedConversations] = useState(null);

    let conversationsKeys;
    if (currentUserData) {
        conversationsKeys = currentUserData.conversations && Object.keys(currentUserData.conversations);
    }

    useEffect(() => {
        /* eslint-disable */

        if (currentUserData.conversations && Object.values(currentUserData.conversations).length > 0) {
            reBase.fetch('users', {})
                .then(users => {
                    const convsUserData = {};
                    const usersIDs = Object.keys(users);

                    conversationsKeys.forEach(key => {
                        if (usersIDs.includes(key)) {
                            convsUserData[key] = users[key];
                        }
                    });

                    setConversationsUserData(convsUserData);
                });
        }
    }, []);

    useEffect(() => {
        /* eslint-disable */

        if (conversationsUserData) {
            const conversationsKeys = Object.keys(currentUserData.conversations);
            const devConversations = [];
            const recConversations = [];

            conversationsKeys.forEach(key => {
                if (conversationsUserData[key]) {
                    if (conversationsUserData[key].role === 'Desarrollador') {
                        devConversations.push({
                            id: key,
                            ...currentUserData.conversations[key],
                            userData: conversationsUserData[key]
                        });
                    }
                    else {
                        recConversations.push({
                            id: key,
                            ...currentUserData.conversations[key],
                            userData: conversationsUserData[key]
                        });
                    }
                }
            });

            setConversationWithDevs(devConversations);
            setConversationWithRecs(recConversations);
        }
    }, [conversationsUserData]);

    useEffect(() => {
        if (conversationsUserData) {
            if (conversationWithDevs && conversationWithRecs) {

                //this could be improved with a for loop with a break intstead.
                conversationWithDevs.forEach(devConv => {
                    Object.values(devConv.messages).forEach(message => {
                        if (message.hasOwnProperty('read') && message.read === false) {
                            setDevConversationsUnreadMessages(true);
                        }
                        else {
                            setDevConversationsUnreadMessages(false);
                        }
                    })
                });

                //this could be improved with a for loop with a break intstead.
                conversationWithRecs.forEach(recConv => {
                    Object.values(recConv.messages).forEach(message => {
                        if (message.hasOwnProperty('read') && message.read === false) {
                            setRecConversationsUnreadMessages(true);
                        }
                        else {
                            setRecConversationsUnreadMessages(false);
                        }
                    })
                });



                if (sortUnreadConversationsBy === 'devs') {
                    setRenderedConversations(conversationWithDevs);
                }
                else {
                    setRenderedConversations(conversationWithRecs);
                }
            }
        }
        else {
            setRenderedConversations([]);
        }
    }, [conversationWithDevs, conversationWithRecs, sortUnreadConversationsBy]);

    return (
        <div className={styles.conversationsWrapper}>
            {
                (
                    renderedConversations
                ) ? (
                        (renderedConversations.length > 0)
                            ? (
                                renderedConversations.map((conversation, index) => {

                                    if (conversation.messages) {
                                        const messagesKeys = Object.keys(conversation.messages);
                                        const unreadMessages = [];

                                        messagesKeys.forEach(msgKey => {
                                            const messageObj = conversation.messages[msgKey];

                                            if (messageObj.hasOwnProperty('read') && messageObj.read === false) {
                                                unreadMessages.push({
                                                    ...conversation.messages[msgKey],
                                                    id: msgKey
                                                });
                                            };
                                        });

                                        return (
                                            <ConversationCircle
                                                key={index}
                                                unreadMessagesNumber={unreadMessages.length}
                                                conversationID={conversation.id}
                                                userData={conversation.userData}
                                            />
                                        )
                                    }
                                })
                            )
                            : (
                                <div className={styles.noConversations}>
                                    <span>
                                        {`
                                            No has iniciado conversaciones con ningún
                                            ${sortUnreadConversationsBy === 'devs' ? 'desarrollador'
                                                : 'reclutador'}`}
                                    </span>
                                </div>
                            )
                    )
                    : (
                        <ReactLoading
                            type='spin'
                            color="grey"
                            className={styles.loader}
                        />
                    )

            }
        </div>
    )
}

export default UnreadConversations;