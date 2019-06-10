import React, { useState } from 'react';
import validUrl from 'valid-url';
import {
    Dialog,
    TextField,
    InputAdornment
} from '@material-ui/core';

import {
    IoIosLink,
    IoMdCheckmark
} from 'react-icons/io';

import styles from './ConfirmLinkDialog.module.scss';


import ErrorDialog from '../ErrorDialog/ErrorDialog';

const ConfirmLinkDialog = ({
    isOpen,
    toggle,
    placeholder,
    confirm }) => {

    const [errorDialog, setErrorDialog] = useState({
        open: false,
        message: ''
    });
    const [link, setLink] = useState('');

    const handleConfirm = () => {
        if (validUrl.isUri(link) || !link) {
            confirm(link);
        }
        else {
            setErrorDialog({
                open: true,
                message: 'Ingresa in enlace URL valido.'
            });
        }
    }

    return (
        <Dialog
            onClose={() => toggle(!isOpen)}
            open={isOpen}
            style={{ color: 'white' }}
        >
            <div className={styles.enterLinkDialog}>
                <div className={styles.linkInputBlock}>
                    <TextField
                        placeholder={placeholder}
                        variant='outlined'
                        fullWidth
                        value={link}
                        onChange={event => setLink(event.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IoIosLink />
                                </InputAdornment>
                            )
                        }}
                    />

                    <span
                        onClick={() => handleConfirm()}
                        className={styles.enterLinkDialogConfirm}>
                        <IoMdCheckmark />
                    </span>
                </div>

                <ErrorDialog
                    isOpen={errorDialog.open}
                    close={() => {
                        setErrorDialog({
                            ...errorDialog,
                            open: false
                        })
                    }}
                    message={errorDialog.message}
                    title='Ha ocurrido un error al agregar el enlace:'
                />
            </div>
        </Dialog>
    );
}

export default ConfirmLinkDialog;