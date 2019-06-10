import React, { useContext, useState, useEffect } from 'react';
import AddItemButton from './../../../AddItemButton/AddItemButton';
import { Typography, Fade } from '@material-ui/core';
import AddExpDialog from './AddExpDialog/AddExpDialog';
import { IoMdBusiness, IoIosCloseCircleOutline } from 'react-icons/io';
import styles from './Experiencia.module.scss';
import cssColors from './../../../../scss/_colors.scss';

import { ProfileContext } from '../../ProfileContext';
import { ExperienciaContext } from './ExperienciaContext';
import { AddExpDialogProvider } from './AddExpDialog/AddExpDialogContext';
import ConfirmDeleteDialog from '../../../Dialogs/ConfirmDeleteDialog/ConfirmDeleteDialog';

import { reBase } from './../../../../firebase';
import { AuthContext } from '../../../../Contexts/AuthContext';

const Experiencia = () => {
    const { user, urlUserID } = useContext(ProfileContext);
    const { currentUser } = useContext(AuthContext);
    const { setAddExpDialogOpen, calculateTotalExperienceYears } = useContext(ExperienciaContext);

    const [showRemoveExpDialog, setShowRemoveExpDialog] = useState(false);
    const [expToBeDeleted, setExpToBeDeleted] = useState(null);

    const experienceIDs = user.experience ? Object.keys(user.experience) : [];
    const experience = user.experience ? Object.values(user.experience) : [];

    const handleDeleteExp = () => {
        reBase.remove(`users/${currentUser.uid}/experience/${expToBeDeleted}`
            , error => console.log(error));

        calculateTotalExperienceYears();
        setShowRemoveExpDialog(false);
    };

    useEffect(() => {
        if (expToBeDeleted) {
            setShowRemoveExpDialog(true);
        }
        else {
            setShowRemoveExpDialog(false);
        }
    }, [expToBeDeleted]);

    return (
        <Fade in timeout={325}>
            <div className={styles.wrapper}>
                <div
                    variant='subtitle1'
                    className={styles.wrapperTitle}
                >
                    Experiencias laborales
            </div>

                {
                    experience.map((exp, index) => {
                        const expID = experienceIDs[index]

                        const startDate = new Date(exp.startDate);
                        const endDateText = (
                            exp.endDate !== 'present'
                                ? `hasta ${exp.endDate.substr(0, 4)}`
                                : 'sigo trabajando aquí'
                        );

                        return (
                            <div
                                key={index}
                                className={styles.expWrapper}
                            >
                                <div
                                    className={styles.expImage}
                                    style={{
                                        backgroundImage: `url(${exp.enterpriseImageURL})`,
                                        ...(
                                            !exp.enterpriseImageURL &&
                                            {
                                                backgroundColor: cssColors.blueLight,
                                                color: cssColors.greyLight,
                                                fontSize: '2rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }
                                        )
                                    }}
                                >
                                    {
                                        !exp.enterpriseImageURL &&
                                        <IoMdBusiness />
                                    }
                                </div>
                                <div className={styles.expInfo}>
                                    <div><b>{exp.jobTitle}</b>, {`en ${exp.enterpriseName}`}</div>
                                    <div>
                                        <small>
                                            {`
                                    Desde ${startDate.getFullYear()}, 
                                        ${endDateText}, 
                                    `}
                                            <span className={styles.expLocation}>
                                                {exp.location}
                                            </span>
                                        </small>
                                    </div>
                                </div>


                                {
                                    !urlUserID &&
                                    <div
                                        className={styles.removeExpButton}
                                        onClick={() => setExpToBeDeleted(expID)}
                                    >
                                        <IoIosCloseCircleOutline />
                                    </div>
                                }
                            </div>
                        );
                    })
                }

                {
                    !user.experience &&
                    <div className={styles.noExpView}>
                        <Typography variant='caption'>
                            No se han agregado experiencias previas.
                        </Typography>
                    </div>
                }

                {
                    !urlUserID &&
                    <AddItemButton
                        text='Añadir experiencia laboral'
                        clicked={() => setAddExpDialogOpen(true)}
                    />
                }


                {
                    //*******/
                    //DIALOGS
                    //*******/
                }

                <AddExpDialogProvider>
                    <AddExpDialog />
                </AddExpDialogProvider>

                <ConfirmDeleteDialog
                    isOpen={showRemoveExpDialog}
                    close={() => setExpToBeDeleted(null)}
                    confirm={() => handleDeleteExp()}
                    title='Confirmar eliminación.'
                    message='¿Estas seguro de querer borrar este artículo?'
                />

            </div>
        </Fade>
    );
}

export default Experiencia;