import {
    Divider,
    Dialog
} from '@material-ui/core';

import styles from './ErrorDialog.module.scss';

import React from 'react';

const ErrorDialog = ({ isOpen, close, message, title }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={close}
        >
            <div className={styles.errorWrapper}>
                <span
                    className={styles.errorTitle}
                >
                    {title}
                </span>

                <Divider style={{ margin: '1rem 0' }} />

                <span className={styles.errorMessage}>
                    {message}
                </span>
            </div>
        </Dialog>
    );
}

export default ErrorDialog;