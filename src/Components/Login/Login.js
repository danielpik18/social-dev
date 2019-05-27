import React, { Component } from 'react';
import styles from './Login.module.scss';
import { IoMdMail, IoIosLock, IoIosLogIn } from 'react-icons/io';
import {
    TextField,
    Typography,
    Divider,
    Container,
    Button,
    Dialog
} from '@material-ui/core';
import * as EmailValidator from 'email-validator';

import { fire } from './../../firebase';

import { AuthContext } from './../../Contexts/AuthContext';

import { Redirect } from 'react-router-dom';
import ErrorDialog from '../ErrorDialog/ErrorDialog';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errorDialogOpen: false,
        errorDialogMessage: ''
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleLogin = () => {
        fire.auth()
            .signInWithEmailAndPassword(
                this.state.email, this.state.password)
            .catch(error => {
                this.setState({
                    errorDialogOpen: true,
                    errorDialogMessage: error.message
                });
            });
    }

    render() {
        return (
            <AuthContext.Consumer>
                {context => (
                    context.currentUser ?
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
                                        onChange={event => this.handleChange(event)}
                                        name='email'
                                    />
                                </div>

                                <div className={styles.inputBlock}>
                                    <IoIosLock className={styles.inputBlockIcon} />

                                    <TextField
                                        fullWidth
                                        label='Ingresa tu contraseña'
                                        type='password'
                                        onChange={event => this.handleChange(event)}
                                        name='password'
                                    />
                                </div>

                                {
                                    <AuthContext.Consumer>
                                        {(context) => (
                                            <Button
                                                fullWidth
                                                className={styles.loginButton}
                                                onClick={this.handleLogin}
                                            >
                                                Ingresar
                                </Button>
                                        )}
                                    </AuthContext.Consumer>
                                }

                                <ErrorDialog
                                    isOpen={this.state.errorDialogOpen}
                                    close={() => this.setState({ errorDialogOpen: false })}
                                    message={this.state.errorDialogMessage}
                                />
                            </Container>
                        )
                )}
            </AuthContext.Consumer>
        );
    }
}

export default Login;