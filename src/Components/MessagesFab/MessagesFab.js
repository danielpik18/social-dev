import React, { useContext } from 'react';
import { Fab } from '@material-ui/core';
import styles from './MessagesFab.module.scss';
import { IoIosChatboxes } from 'react-icons/io';
import MessagesPopover from './MessagesPopover/MessagesPopover';
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
                    <MessagesPopover />
                )
            }
        </>
    );
}

export default MessagesFab;