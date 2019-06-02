import React, { useState, useContext } from 'react';
import styles from './Login.module.scss';
import { IoMdMail, IoIosLock, IoIosLogIn } from 'react-icons/io';
import {
    TextField,
    Typography,
    Divider,
    Container,
    Button
} from '@material-ui/core';
import * as EmailValidator from 'email-validator';

import { fire } from './../../firebase';

import { AuthContext } from './../../Contexts/AuthContext';

import { Redirect } from 'react-router-dom';
import ErrorDialog from './../Dialogs/ErrorDialog/ErrorDialog';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorDialog, setErrorDialog] = useState({
        open: false,
        message: ''
    });

    const { currentUser } = useContext(AuthContext);

    const handleLogin = () => {
        fire.auth()
            .signInWithEmailAndPassword(
                email, password)
            .catch(error => {
                setErrorDialog({
                    open: true,
                    message: error.message
                });
            });
    }

    return (
        currentUser ?
            <Redirect to='/'></Redirect>
            : (
                <Container maxWidth='sm' className={styles.loginWrapper}>
                    <div className={styles.loginTitle}>
                        <IoIosLogIn className={styles.loginTitleIcon} />

                        <Typography variant='h6'>
                            Ingresa tus credenciales
                        </Typography>
                    </div>

                    <Divider style={{ margin: '1rem 0' }} />

                    <div className={styles.inputBlock}>
                        <IoMdMail className={styles.inputBlockIcon} />

                        <TextField
                            fullWidth
                            label='Ingresa tu correo electrónico'
                            onChange={event => setEmail(event.target.value)}
                            name='email'
                        />
                    </div>

                    <div className={styles.inputBlock}>
                        <IoIosLock className={styles.inputBlockIcon} />

                        <TextField
                            fullWidth
                            label='Ingresa tu contraseña'
                            type='password'
                            onChange={event => setPassword(event.target.value)}
                            name='password'
                        />
                    </div>


                    <Button
                        fullWidth
                        className={styles.loginButton}
                        onClick={handleLogin}
                    >
                        Ingresar
                    </Button>

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
                </Container>
            )
    );
}

export default Login;