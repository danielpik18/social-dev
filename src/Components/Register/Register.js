import React, { Component } from 'react';
import styles from './Register.module.scss';
import {
    Typography,
    TextField,
    Divider,
    Select,
    Input,
    Button
} from '@material-ui/core';
import { IoMdMail, IoIosLock, IoIosPerson } from 'react-icons/io';
import { TiEdit } from 'react-icons/ti';

class Register extends Component {
    state = {
        email: '',
        password: '',
        rol: ''
    }

    renderValue = (value) => {
        return value;
    }

    render() {
        return (
            <div>
                <div className={styles.wrapper}>
                    <div className={styles.bgImage}></div>

                    <div className={styles.registerBox}>
                        <div className={styles.title}>
                            <TiEdit className={styles.titleIcon} />
                            <Typography variant='h6' color='textSecondary'>
                                {'Registrate'.toUpperCase()}
                            </Typography>
                        </div>

                        <Divider style={{ margin: '1rem 0' }} />

                        <div className={styles.inputBlock}>
                            <IoMdMail className={styles.inputBlockIcon} />

                            <TextField
                                fullWidth
                                label='Ingresa tu correo electrónico'
                            />
                        </div>

                        <div className={styles.inputBlock}>
                            <IoIosLock className={styles.inputBlockIcon} />

                            <TextField
                                fullWidth
                                label='Ingresa tu contraseña'
                            />
                        </div>

                        <div className={styles.inputBlock}>
                            <IoIosPerson className={styles.inputBlockIcon} />

                            <Select
                                native
                                onChange={(event) => this.setState({ rol: event.target.value })}
                                value={this.state.rol}
                                fullWidth
                                displayEmpty
                                name='asd'
                                input={<Input name="rol" id="rolUsuario" />}
                            >
                                <option value="">
                                    Selecciona un rol
                                </option>
                                <option value={'Desarrollador'}>Desarrollador</option>
                                <option value={'Reclutador'}>Reclutador</option>
                            </Select>
                        </div>

                        <Button fullWidth className={styles.submitButton}>
                            Completar registro
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;