import React, { useContext, useState } from 'react';
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
    IoIosCheckmark
} from 'react-icons/io';
import { ProfileContext } from '../ProfileContext';
import { UserInfoContext } from './UserInfoContext';
import { reBase } from '../../../firebase';
import { AuthContext } from '../../../Contexts/AuthContext';

const UserInfo = () => {
    const { user, urlUserID } = useContext(ProfileContext);
    const { currentUser } = useContext(AuthContext);

    const {
        editMode,
        setEditMode,
        infoEditable
    } = useContext(UserInfoContext);

    const [showEditButton, setShowEditButton] = useState(false);
    const [bioReadMore, setBioReadMore] = useState(
        (user.bio && user.bio.length > 300) && true
    );

    const [bioEdited, setBioEdited] = useState(user.bio && user.bio);
    const [nameEdited, setNameEdited] = useState(user.name);
    const [lastnameEdited, setLastnameEdited] = useState(user.lastname);

    const resetEditedData = () => {
        setBioEdited(user.bio && user.bio);
        setNameEdited(user.name);
        setLastnameEdited(user.lastname);
    };

    const infoFields = [
        (
            !urlUserID &&
            {
                name: 'Correo electrónico',
                value: user.email
            }
        ),
        {
            name: 'Rol',
            value: user.role
        },
        {
            name: 'Años totales de experiencia',
            value: user.totalExperienceYears ? user.totalExperienceYears : '--'
        }
    ];

    const editableInfoFields = [
        {
            display: true,
            name: 'Nombre(s)',
            value: `${user.name}`,
            input: (
                <Fade in timeout={5000}>
                    <>
                        <Divider style={{ margin: '1rem 0' }} />

                        <div className={styles.editInfoField}>
                            <TextField
                                fullWidth
                                label='Nombre(s)'
                                value={nameEdited}
                                onChange={(e) => setNameEdited(e.target.value)}
                                InputProps={{
                                    disableUnderline: true
                                }}
                            />
                        </div>
                    </>
                </Fade>
            )
        },
        {
            display: true,
            name: 'Apellido(s)',
            value: `${user.lastname}`,
            input: (
                <Fade in timeout={5000}>
                    <>
                        <Divider style={{ margin: '1rem 0' }} />

                        <div className={styles.editInfoField}>
                            <TextField
                                fullWidth
                                label='Apellido(s)'
                                value={lastnameEdited}
                                onChange={(e) => setLastnameEdited(e.target.value)}
                                InputProps={{
                                    disableUnderline: true
                                }}
                            />
                        </div>

                        <Divider style={{ margin: '1rem 0' }} />
                    </>
                </Fade>
            )
        }
    ];

    const confirmEdit = () => {
        const editedUser = {};

        if (!nameEdited) {
            console.log('error - cant leave name field empty');
        }
        else if (!lastnameEdited) {
            console.log('error - cant leave last name field empty');
        }
        else {
            editedUser.name = nameEdited;
            editedUser.lastname = lastnameEdited;

            if (bioEdited) {
                editedUser.bio = bioEdited;
            }

            reBase.update(`users/${currentUser.uid}`, {
                data: editedUser
            });

            setEditMode(false);
        }

        resetEditedData();
    }

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

            <Typography variant='h6'>
                Bio:
            </Typography>

            <div className={styles.userBio}>
                {
                    !editMode &&
                    user.bio && (
                        bioReadMore
                            ? user.bio.slice(0, 300)
                            : user.bio
                    )
                }

                {
                    !editMode &&
                    (user.bio && (user.bio.length > 300)) && (
                        bioReadMore
                            ?
                            <span
                                className={styles.userBioReadMore}
                                onClick={() => setBioReadMore(false)}
                            >
                                Leer más
                            </span>
                            :
                            <span
                                className={styles.userBioReadMore}
                                onClick={() => setBioReadMore(true)}
                            >
                                Leer menos
                        </span>
                    )
                }

                {
                    editMode &&
                    (
                        <TextField
                            label='Biografía'
                            variant='outlined'
                            multiline
                            fullWidth
                            rows={6}
                            rowsMax={8}
                            value={bioEdited}
                            onChange={(e) => setBioEdited(e.target.value)}
                        />
                    )
                }
            </div>

            <Divider style={{ margin: '1rem 0' }} />

            <Grid container>
                <Grid item xs={6}>
                    <div className={styles.infoFieldsWrapper}>
                        {
                            editableInfoFields.map(field => {
                                if (field.display && (infoEditable && editMode)) {
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
                            })
                        }
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={styles.infoFieldsWrapper}>
                        {
                            !editMode &&
                            infoFields.map(field => (
                                field &&
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
                        onClick={() => {
                            resetEditedData();
                            setEditMode(true);
                        }}
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