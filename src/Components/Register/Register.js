import React, { Component, useState } from 'react';
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
import ErrorDialog from '../ErrorDialog/ErrorDialog';

const Register = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [errorDialog, setErrorDialog] = useState({
        open: false,
        message: ''
    });

    const submitUser = () => {
        if (name && lastname && email && password && role) {
            if (EmailValidator.validate(email)) {
                firebase.auth()
                    .createUserWithEmailAndPassword(
                        email, password
                    )
                    .then(user => {
                        reBase.post(`users/${user.user.uid}`, {
                            data: {
                                name,
                                lastname,
                                email,
                                password,
                                role
                            }
                        }).catch(error => {
                            setErrorDialog({
                                open: true,
                                message: error.message
                            });
                        });

                        alert('User added correctly');
                    })
                    .catch(error => {
                        setErrorDialog({
                            open: true,
                            message: error.message
                        });
                    });
            }
            else {
                setErrorDialog({
                    open: true,
                    message: 'El correo electrónico no es valido.'
                });
            }
        }
        else {
            setErrorDialog({
                open: true,
                message: 'Debes llenar todos los campos.'
            });
        }
    }

    const inputBlocks = [
        {
            name: 'name',
            label: 'Ingresa tu(s) nombre(s)',
            type: 'text',
            change: event => setName(event.currentTarget.value),
            icon: <IoMdCreate className={styles.inputBlockIcon} />
        },
        {
            name: 'lastname',
            label: 'Ingresa tu(s) apellido(s)',
            type: 'text',
            change: event => setLastname(event.currentTarget.value),
            icon: <IoMdCreate className={styles.inputBlockIcon} />
        },
        {
            name: 'email',
            label: 'Ingresa tu correo electrónico',
            type: 'password',
            change: event => setEmail(event.currentTarget.value),
            icon: <IoMdMail className={styles.inputBlockIcon} />
        },
        {
            name: 'password',
            label: 'Ingresa tu contraseña',
            type: 'password',
            change: event => setPassword(event.currentTarget.value),
            icon: <IoIosLock className={styles.inputBlockIcon} />
        },
    ];

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

                                {
                                    inputBlocks.map(block => (
                                        <div
                                            key={block.name}
                                            className={styles.inputBlock}
                                        >
                                            {block.icon}

                                            <TextField
                                                name={block.name}
                                                fullWidth
                                                label={block.label}
                                                onChange={block.change}
                                            />
                                        </div>
                                    ))
                                }

                                <div className={styles.inputBlock}>
                                    <IoIosPerson className={styles.inputBlockIcon} />

                                    <Select
                                        native
                                        onChange={event => setRole(event.currentTarget.value)}
                                        name='role'
                                        value={role}
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
                                    onClick={submitUser}
                                >
                                    Completar registro
                                </Button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
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
    );
}

export default Register;