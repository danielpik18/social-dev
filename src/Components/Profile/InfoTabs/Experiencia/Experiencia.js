import React, { useContext, useState } from 'react';
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
    const [removeExpButtonID, setRemoveExpButtonID] = useState('');
    const [showRemoveExpButton, setShowRemoveExpButton] = useState(false);
    const [showRemoveExpDialog, setShowRemoveExpDialog] = useState(false)

    const { user, urlUserID } = useContext(ProfileContext);
    const { setAddExpDialogOpen, calculateTotalExperienceYears } = useContext(ExperienciaContext);
    const { currentUser } = useContext(AuthContext);

    const experienceIDs = user.experience ? Object.keys(user.experience) : [];
    const experience = user.experience ? Object.values(user.experience) : [];

    const handleDeleteExp = () => {
        reBase.remove(`users/${currentUser.uid}/experience/${removeExpButtonID}`
            , error => console.log(error));


        calculateTotalExperienceYears();
        setShowRemoveExpDialog(false);
    };

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
                                onMouseEnter={() => {
                                    setRemoveExpButtonID(expID);
                                    setShowRemoveExpButton(true);
                                }}
                                onMouseLeave={() => setShowRemoveExpButton(false)}
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
                                    (showRemoveExpButton && (removeExpButtonID === expID)) &&
                                    <Fade in>
                                        <div
                                            className={styles.removeExpButton}
                                            onClick={() => setShowRemoveExpDialog(true)}
                                        >
                                            <IoIosCloseCircleOutline />
                                        </div>
                                    </Fade>
                                }
                            </div>
                        );
                    })
                }

                {
                    !user.experience &&
                    <div className={styles.noExpView}>
                        <Typography variant='caption'>
                            Aún no has agredado experiencias previas.
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
                    close={() => setShowRemoveExpDialog(false)}
                    confirm={() => handleDeleteExp()}
                    title='Confirmar eliminación.'
                    message='¿Estas seguro de querer borrar este artículo?'
                />

            </div>
        </Fade>
    );
}

export default Experiencia;