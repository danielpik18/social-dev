import React, { Component } from 'react';
import styles from './Register.module.scss';
import {
    Typography,
    TextField,
    Divider,
    Select,
    Input,
    Button,
    Grid
} from '@material-ui/core';
import { IoMdMail, IoIosLock, IoIosPerson, IoMdCreate } from 'react-icons/io';
import { TiEdit } from 'react-icons/ti';

import * as EmailValidator from 'email-validator';

import { reBase } from './../../firebase';

import firebase from "firebase";

class Register extends Component {
    state = {
        email: '',
        password: '',
        role: '',
        name: '',
        lastname: ''
    }

    renderValue = (value) => {
        return value;
    }

    submitUser = () => {
        if (EmailValidator.validate(this.state.email)) {
            firebase.auth()
                .createUserWithEmailAndPassword(
                    this.state.email, this.state.password
                )
                .then(user => {
                    reBase.post(`users/${user.user.uid}`, {
                        data: {
                            ...this.state
                        }
                    });
                })
                .catch(error => console.log(error.message));

            return alert('User added correctly');
        }
        else {
            return alert('Email incorrect');
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {

        return (
            <div>
                <div className={styles.wrapper}>
                    <div className={styles.bgImage}></div>

                    <Grid container>
                        <Grid item xs={7}>
                            <div className={styles.titleWrapper}>
                                <div className={styles.socialDevLogo}></div>

                                <Typography variant='h5' color='inherit'>
                                    La red social para desarrolladores
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <div className={styles.registerBoxWrapper}>
                                <div className={styles.registerBox}>
                                    <div className={styles.title}>
                                        <TiEdit className={styles.titleIcon} />

                                        <Typography variant='h6' color='textSecondary'>
                                            {'Registrate'.toUpperCase()}
                                        </Typography>
                                    </div>

                                    <Divider style={{ margin: '1rem 0' }} />

                                    <div className={styles.inputBlock}>
                                        <IoMdCreate className={styles.inputBlockIcon} />

                                        <TextField
                                            name='name'
                                            fullWidth
                                            label='Ingresa tu(s) nombre(s)'
                                            onChange={event => this.handleChange(event)}
                                        />
                                    </div>

                                    <div className={styles.inputBlock}>
                                        <IoMdCreate className={styles.inputBlockIcon} />

                                        <TextField
                                            name='lastname'
                                            fullWidth
                                            label='Ingresa tu(s) apellido(s)'
                                            onChange={event => this.handleChange(event)}
                                        />
                                    </div>

                                    <div className={styles.inputBlock}>
                                        <IoMdMail className={styles.inputBlockIcon} />

                                        <TextField
                                            name='email'
                                            fullWidth
                                            label='Ingresa tu correo electrónico'
                                            onChange={event => this.handleChange(event)}
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

                                    <div className={styles.inputBlock}>
                                        <IoIosPerson className={styles.inputBlockIcon} />

                                        <Select
                                            native
                                            onChange={event => this.handleChange(event)}
                                            name='role'
                                            value={this.state.role}
                                            fullWidth
                                            displayEmpty
                                            input={<Input name="rol" id="rolUsuario" />}
                                        >
                                            <option value="">
                                                Selecciona un rol
                                        </option>
                                            <option value={'Desarrollador'}>Desarrollador</option>
                                            <option value={'Reclutador'}>Reclutador</option>
                                        </Select>
                                    </div>

                                    <Button
                                        fullWidth
                                        className={styles.submitButton}
                                        onClick={this.submitUser}
                                    >
                                        Completar registro
                                </Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Register;