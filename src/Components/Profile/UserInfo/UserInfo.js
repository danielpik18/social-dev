import React, { useContext, useState, useEffect } from 'react';
import {
    Typography,
    Divider,
    Grid,
    Fab,
    Fade,
    TextField
} from '@material-ui/core';
import styles from './UserInfo.module.scss';
import { TiEdit } from 'react-icons/ti';
import {
    IoMdCreate,
    IoIosSettings,
    IoIosCheckmark,
    IoIosAlbums
} from 'react-icons/io';
import { ProfileContext } from '../ProfileContext';

const UserInfo = () => {
    const { user, urlUserID } = useContext(ProfileContext);
    const [infoEditable, setInfoEditable,] = useState(false);
    const [showEditButton, setShowEditButton] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        (user && !urlUserID) && setInfoEditable(true);
    });

    const confirmEdit = () => {
        setEditMode(false)
    }

    const infoFields = [
        {
            name: 'Correo electrónico',
            value: user.email
        },
        {
            name: 'Rol',
            value: user.role
        }
    ];

    const editableInfoFields = [
        {
            display: true,
            name: 'Nombre completo',
            value: `${user.name} ${user.lastname}`,
            input: (
                <Fade in timeout={5000}>
                    <>
                        <Divider style={{ margin: '1rem 0' }} />

                        <div className={styles.editInfoField}>
                            <TextField
                                fullWidth
                                label='Nombre(s)'
                                value={user.name}
                                InputProps={{
                                    disableUnderline: true
                                }}
                            />
                        </div>

                        <div className={styles.editInfoField}>
                            <TextField
                                fullWidth
                                label='Apellido(s)'
                                value={user.lastname}
                                InputProps={{
                                    disableUnderline: true
                                }}
                            />
                        </div>

                        <Divider style={{ margin: '1rem 0' }} />
                    </>
                </Fade>
            )
        },
        {
            display: user.role === 'Desarrollador',
            name: 'Disponibilidad',
            value: user.availability ? user.availability : '--',
            input: (
                <div className={styles.configBlock}>
                    <span className={styles.configBlockValue}>
                        {user.projects ? user.projects : '--'}
                    </span>

                    <div className={styles.configButton}>
                        <span className={styles.configButtonText}>
                            Configurar disponibilidad
                        </span>

                        <IoIosSettings />
                    </div>
                </div>
            )
        },
        {
            display: user.role === 'Desarrollador',
            name: 'Proyectos realizados',
            value: user.projects ? user.projects : '--',
            input: (
                <div className={styles.configBlock}>
                    <span className={styles.configBlockValue}>
                        {user.projects ? user.projects : '--'}
                    </span>

                    <div className={styles.configButton}>
                        <span className={styles.configButtonText}>
                            Gestionar proyectos
                        </span>

                        <IoIosAlbums />
                    </div>
                </div>
            )
        }
    ];

    return (
        <div
            className={styles.infoWrapper}
            onMouseEnter={() => setShowEditButton(true)}
            onMouseLeave={() => setShowEditButton(false)}
        >
            <div className={styles.infoTitle}>
                <TiEdit className={styles.infoTitleIcon} />
                <Typography variant='h6'>
                    Informacion general:
                </Typography>
            </div>

            <Divider style={{ margin: '1rem 0' }} />

            <Grid container>
                <Grid item xs={6}>
                    <div className={styles.infoFieldsWrapper}>
                        {
                            editableInfoFields.map(field => {
                                if (field.display) {
                                    if (infoEditable && editMode) {
                                        return (
                                            <div
                                                className={styles.infoField}
                                                key={field.name}
                                            >
                                                <span>
                                                    {`${field.name}:`}
                                                </span>
                                                {field.input}
                                            </div>
                                        )
                                    }
                                    else {
                                        return (
                                            <div
                                                className={styles.infoField}
                                                key={field.name}
                                            >
                                                <span>
                                                    {`${field.name}:`}
                                                </span>
                                                <span style={{ color: 'grey' }}>
                                                    <small>{field.value}</small>
                                                </span>
                                            </div>
                                        )
                                    }
                                }
                            })
                        }
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={styles.infoFieldsWrapper}>
                        {
                            infoFields.map(field => (
                                <div
                                    className={styles.infoField}
                                    key={field.name}
                                >
                                    <span>
                                        {`${field.name}:`}
                                    </span>
                                    <span style={{ color: 'grey' }}>
                                        <Typography variant='subtitle1'>
                                            {field.value}
                                        </Typography>
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </Grid>
            </Grid>

            {
                (
                    infoEditable &&
                    showEditButton &&
                    !urlUserID &&
                    !editMode
                ) &&
                <Fade in>
                    <Fab
                        size='small'
                        className={styles.editButton}
                        onClick={() => setEditMode(true)}
                    >
                        <IoMdCreate />
                    </Fab>
                </Fade>
            }

            {
                editMode &&
                <Fade in>
                    <Fab
                        size='small'
                        className={styles.confirmEditButton}
                        onClick={confirmEdit}
                    >
                        <IoIosCheckmark />
                    </Fab>
                </Fade>
            }
        </div>
    );
}

export default UserInfo;