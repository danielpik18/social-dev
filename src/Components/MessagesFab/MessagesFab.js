import React, { useState, useContext } from 'react';
import { Fab } from '@material-ui/core';
import styles from './MessagesFab.module.scss';
import { IoIosChatboxes } from 'react-icons/io';
import MessagesPopover from './MessagesPopover/MessagesPopover';
import { MessagesPopoverProvider } from './MessagesPopover/MessagesPopoverContext';
import { MessagesFabContext } from './MessagesFabContext';

const MessagesFab = () => {
    const { popoverOpen, setPopoverOpen } = useContext(MessagesFabContext);

    return (
        <>
            <Fab className={styles.messagesFloatingButton}
                onClick={() => setPopoverOpen(!popoverOpen)}
            >
                <IoIosChatboxes />
            </Fab>

            {
                popoverOpen &&
                (
                    <MessagesPopoverProvider>
                        <MessagesPopover />
                    </MessagesPopoverProvider>
                )
            }
        </>
    );
}

export default MessagesFab;