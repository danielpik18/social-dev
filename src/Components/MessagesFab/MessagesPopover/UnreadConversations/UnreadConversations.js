import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../Contexts/AuthContext';
import styles from './UnreadConversations.module.scss';
import ReactLoading from 'react-loading';
import { UnreadConversationsContext } from './UnreadConversationsContext';
import { reBase } from '../../../../firebase';
import ConversationCircle from './ConversationCircle/ConversationCircle';
import { MessagesPopoverContext } from '../MessagesPopoverContext';

const UnreadConversations = () => {
    const { currentUser } = useContext(AuthContext);
    const {
        userConversations,
        setUserConversations,
        conversationsUserData,
        setConversationsUserData
    } = useContext(UnreadConversationsContext);
    const { sortUnreadConversationsBy, setSortUnreadConversationsBy } = useContext(MessagesPopoverContext);

    const [conversationWithDevs, setConversationWithDevs] = useState([]);
    const [conversationWithRecs, setConversationWithRecs] = useState([]);
    const [renderedConversations, setRenderedConversations] = useState(null);

    const conversationsKeys = userConversations && Object.keys(userConversations);

    useEffect(() => {
        /* eslint-disable */


        const bindRef = reBase.bindToState(`users/${currentUser.uid}/conversations`, {
            context: {
                setState: ({ userConversations }) => setUserConversations({ ...userConversations }),
                state: { userConversations }
            },
            state: 'userConversations'
        });

        return () => reBase.removeBinding(bindRef);
    }, []);


    useEffect(() => {
        /* eslint-disable */

        if (userConversations && Object.values(userConversations).length > 0) {
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
    }, [userConversations]);

    useEffect(() => {
        /* eslint-disable */

        if (conversationsUserData) {
            const convsUserDataKeys = Object.keys(conversationsUserData);
            const devConversations = [];
            const recConversations = [];

            convsUserDataKeys.forEach(key => {
                if (conversationsUserData[key].role === 'Desarrollador') {
                    devConversations.push({
                        ...userConversations[key],
                        userData: conversationsUserData[key]
                    });
                }
                else {
                    recConversations.push({
                        ...userConversations[key],
                        userData: conversationsUserData[key]
                    });
                }
            });

            setConversationWithDevs(devConversations);
            setConversationWithRecs(recConversations);
        }
    }, [conversationsUserData]);

    useEffect(() => {
        if (conversationsUserData) {
            if (conversationWithDevs && conversationWithRecs) {
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
                                conversationsKeys.map((key, index) => {
                                    const conversation = userConversations[key];

                                    if (conversationsUserData[key] && conversation.messages) {
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
                                                conversationID={key}
                                                userData={conversationsUserData[key]}
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