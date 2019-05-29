import {
    Divider,
    Dialog,
    Fab
} from '@material-ui/core';
import { IoIosCheckmark, IoIosClose } from 'react-icons/io';

import styles from './ConfirmDeleteDialog.module.scss';

import React from 'react';

const ConfirmDeleteDialog = ({ isOpen, close, confirm, message, title }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={close}
        >
            <div className={styles.wrapper}>
                <span
                    className={styles.title}
                >
                    {title}
                </span>

                <Divider style={{ margin: '1rem 0' }} />

                <span className={styles.message}>{message}</span>

                <span className={styles.actionButtons}>
                    <Fab
                        onClick={confirm}
                        size='small'
                        className={styles.actionButtonsConfirm}
                    >
                        <IoIosCheckmark />
                    </Fab>

                    <Fab
                        onClick={close}
                        size='small'
                        className={styles.actionButtonsCancel}
                    >
                        <IoIosClose />
                    </Fab>
                </span>
            </div>
        </Dialog>
    );
}

export default ConfirmDeleteDialog;