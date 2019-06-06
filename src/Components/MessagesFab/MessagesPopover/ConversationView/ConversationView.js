import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ConversationView.module.scss';
import { TextField } from '@material-ui/core';
import { FiMessageCircle } from 'react-icons/fi';
import Message from './../Message/Message';
import ReactLoading from 'react-loading';
import { reBase } from '../../../../firebase';
import { AuthContext } from '../../../../Contexts/AuthContext';
import { ConversationViewContext } from './ConversationViewContext';

import { scrollDivToBottom } from './../../../../utils/misc';

const ConversationView = () => {
    const { currentUser } = useContext(AuthContext);
    const {
        currentConversation,
        setCurrentConversation,
        currentConversationID,
        setCurrentConversationID,
        currentConversationUserData,
        setCurrentConversationUserData
    } = useContext(ConversationViewContext);

    const [message, setMessage] = useState('');
    const [textFieldRows, settextFieldRows] = useState(1);

    const messagesWithID = [];

    if (currentConversation && currentConversation.messages) {
        const messagesKeys = Object.keys(currentConversation.messages);

        messagesKeys.forEach(msgKey => {
            const messageObj = currentConversation.messages[msgKey];

            messagesWithID.push({
                ...messageObj,
                id: msgKey
            });

        });
    }

    useEffect(() => {
        /* eslint-disable */

        return () => {
            setCurrentConversationID(null);
            setCurrentConversationUserData(null);
            setCurrentConversation(null);
        }
    }, []);

    useEffect(() => {
        reBase.bindToState(`users/${currentUser.uid}/conversations/${currentConversationID}`, {
            context: {
                setState: ({ currentConversation }) => setCurrentConversation({ ...currentConversation }),
                state: { currentConversation }
            },
            state: 'currentConversation'
        });

        console.log('currentconvid changed, did bind');

    }, [currentConversationID]);

    const handleKeyPressed = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (currentConversation && currentConversationUserData) {
                if (message) {
                    const messageObj = {
                        content: message,
                        from: currentUser.uid,
                        dateSent: (new Date()).getTime()
                    };

                    reBase.push(`users/${currentUser.uid}/conversations/${currentConversationID}/messages`, {
                        data: messageObj,
                        then: (err) => {
                            if (err) console.log(err)
                            else {
                                scrollDivToBottom('messagesWrapper');

                                reBase.push(`users/${currentConversationID}/conversations/${currentUser.uid}/messages`, {
                                    data: {
                                        ...messageObj,
                                        read: false
                                    }
                                });
                            }
                        }
                    });


                    setMessage('');
                    settextFieldRows(0);
                }
            }
        }
    };

    return (
        (currentConversation && currentConversationUserData) ?
            (
                <div className={styles.conversationWrapper}>
                    <div className={styles.conversationHeader}>
                        <div
                            className={styles.conversationHeaderImage}
                            style={{
                                background: `url(${currentConversationUserData.profileImageURL})`
                            }}
                        >
                        </div>

                        <Link to={`/profile/${currentConversationID}`} className={styles.conversationHeaderName}>
                            {`${currentConversationUserData.name} ${currentConversationUserData.lastname}`}
                        </Link>
                    </div>

                    <div className={styles.messagesWrapper} id='messagesWrapper'>
                        {
                            messagesWithID.length > 0
                                ? (
                                    messagesWithID
                                        .sort((a, b) => a.dateSent > b.dateSent)
                                        .map((message, index) => {

                                            return (
                                                <Message
                                                    key={index}
                                                    message={message}
                                                    userData={currentConversationUserData}
                                                />
                                            );
                                        })

                                )
                                : (
                                    <div className={styles.noMessages}>
                                        <FiMessageCircle />
                                        <span>Se el primero en enviarle un mensaje!</span>
                                    </div>
                                )
                        }
                    </div>

                    <div className={styles.textfieldWrapper}>
                        <TextField
                            fullWidth
                            placeholder='Escribe un mensaje'
                            multiline
                            rows={textFieldRows}
                            rowsMax={4}

                            value={message}
                            onChange={e => setMessage(e.currentTarget.value)}
                            onKeyDown={e => handleKeyPressed(e)}

                            inputProps={{
                                style: { fontSize: '14px', padding: '.25rem' }
                            }}
                        />
                    </div>
                </div>
            ) : (
                <ReactLoading
                    type='spin'
                    color="grey"
                    className={styles.loader}
                />
            )
    );
}

export default ConversationView;