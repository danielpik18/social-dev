import React, { useState, useContext, useEffect } from 'react';

import {
    Dialog,
    Typography,
    TextField,
    InputAdornment
} from '@material-ui/core';

import {
    IoIosLink,
    IoMdCheckmark
} from 'react-icons/io';

import { AuthContext } from './../../../../Contexts/AuthContext';
import { reBase } from './../../../../firebase';

import styles from './ConfirmLinkModal.module.scss';
import { ProfileContext } from '../../ProfileContext';

import validUrl from 'valid-url';
import ErrorDialog from '../../../ErrorDialog/ErrorDialog';

const ConfirmLinkModal = ({ isOpen, toggle, linkTitle }) => {
    const [link, setLink] = useState('');
    const { currentUser } = useContext(AuthContext);
    const { user } = useContext(ProfileContext);

    const [errorDialog, setErrorDialog] = useState({
        open: false,
        message: ''
    });

    useEffect(() => {
        if (user.socialMediaLink) {
            setLink(user.socialMediaLinks[linkTitle]);
        }
    }, []);

    const confirmLink = () => {
        if (validUrl.isUri(link) || !link) {
            reBase.post(
                `users/${currentUser.uid}/socialMediaLinks/${linkTitle}`,
                {
                    data: link
                }).catch(err => alert(err));

            toggle(false);
        }
        else {
            setErrorDialog({
                open: true,
                message: 'Ingresa in enlace URL valido.'
            })
        }
    };

    return (
        <Dialog
            onClose={() => toggle(!isOpen)}
            open={isOpen}
            style={{ color: 'white' }}
        >
            <div className={styles.enterLinkModal}>
                <Typography
                    variant='h6'
                    className={styles.enterLinkModalTitle}
                >
                    Ingresa el enlace a tu perfíl de {linkTitle}
                </Typography>

                <div className={styles.linkInputBlock}>
                    <TextField
                        placeholder='https://www.ejemplo.com/usuario'
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
                        onClick={() => confirmLink()}
                        className={styles.enterLinkModalConfirm}>
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
                    title='Ha ocurrido un error al intentar ingresar:'
                />
            </div>
        </Dialog>
    );
}

export default ConfirmLinkModal;