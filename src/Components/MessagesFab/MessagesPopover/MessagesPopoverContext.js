import React, { useState, useEffect, useContext } from 'react';
import { reBase } from '../../../firebase';
import { AuthContext } from '../../../Contexts/AuthContext';

const MessagesPopoverContext = React.createContext();

const MessagesPopoverProvider = (props) => {
    const { currentUser } = useContext(AuthContext);

    const [currentConversation, setCurrentConversation] = useState(null);
    const [currentConversationID, setCurrentConversationID] = useState('');
    const [currentView, setCurrentView] = useState('conversationsList');


    const [conversationsWithID, setConversationsWithID] = useState(null);
    const [userConversationsFormatted, setUserConversationsFormatted] = useState(null);
    const [testState, setTestState] = useState(null);



    useEffect(() => {
        if (currentView === 'conversationsList') {
            reBase.fetch(`users/${currentUser.uid}/conversations`, {})
                .then(conversations => {
                    const conversationsKeys = Object.keys(conversations);

                    const convs = [];

                    conversationsKeys.forEach(key => {
                        convs.push({
                            ...conversations[key],
                            id: key
                        });
                    })

                    setConversationsWithID(convs)
                });
        }
        else if (currentView === 'conversation') {
            reBase
                .fetch(`users/${currentUser.uid}/conversations/${currentConversationID}`, {})
                .then(conversation => {
                    const conversationFormatted = userConversationsFormatted.filter(
                        formatedConv => formatedConv.with === conversation.with)[0];

                    setCurrentConversation(conversationFormatted)
                });
        }
    }, [currentView]);



    useEffect(() => {
        if (conversationsWithID) {
            conversationsWithID
                .sort((a, b) => {
                    return (a.unreadMessages === b.unreadMessages)
                        ? 0
                        : (
                            a.unreadMessages
                                ? -1
                                : 1
                        )
                })
                .forEach(convWithId => {
                    reBase
                        .fetch(`users/${convWithId.with}`, {})
                        .then(user => {
                            //console.log('fire1')
                            setTestState({
                                ...convWithId,
                                userWithName: `${user.name} ${user.lastname}`,
                                userWithImage: user.profileImageURL
                            });
                        });
                })
        }
    }, [conversationsWithID]);

    useEffect(() => {
        if (testState) {
            //console.log('fire2');
            if (userConversationsFormatted) {
                setUserConversationsFormatted([...userConversationsFormatted, testState]);
            }
            else {
                setUserConversationsFormatted([testState]);
            }
        }
    }, [testState])

    useEffect(() => {
        if (userConversationsFormatted) {
            //console.log(userConversationsFormatted);
        }
    }, [userConversationsFormatted]);



    useEffect(() => {
        if (currentConversationID) {
            setCurrentView('conversation');
        }
    }, [currentConversationID])

    useEffect(() => {
        if (currentConversation) {
            console.log(userConversationsFormatted);
        }
    }, [currentConversation])


    return (
        <MessagesPopoverContext.Provider
            value={{
                setCurrentConversationID,
                currentView,
                setCurrentView,
                userConversationsFormatted,
                currentConversation
            }}
        >
            {props.children}
        </MessagesPopoverContext.Provider>
    )
};

export {
    MessagesPopoverContext,
    MessagesPopoverProvider
}