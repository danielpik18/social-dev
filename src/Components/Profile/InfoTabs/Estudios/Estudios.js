import React, { useContext, useState } from 'react';
import AddItemButton from '../../../AddItemButton/AddItemButton';
import { Typography, Fade } from '@material-ui/core';
import AddEstudioDialog from './AddEstudioDialog/AddEstudioDialog';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { FaSchool } from 'react-icons/fa';
import styles from './Estudios.module.scss';
import cssColors from './../../../../scss/_colors.scss';

import { ProfileContext } from '../../ProfileContext';
import { EstudiosContext } from './EstudiosContext';
import { AddEstudioDialogProvider } from './AddEstudioDialog/AddEstudioDialogContext';
import ConfirmDeleteDialog from '../../../Dialogs/ConfirmDeleteDialog/ConfirmDeleteDialog';

import { reBase } from '../../../../firebase';
import { AuthContext } from '../../../../Contexts/AuthContext';

const Estudios = () => {
    const [removeEstudioButtonID, setRemoveEstudioButtonID] = useState('');
    const [showRemoveEstudioButton, setShowRemoveEstudioButton] = useState(false);
    const [showRemoveEstudioDialog, setShowRemoveEstudioDialog] = useState(false)

    const { user, urlUserID } = useContext(ProfileContext);
    const { setAddEstudioDialogOpen } = useContext(EstudiosContext);
    const { currentUser } = useContext(AuthContext);

    const estudiosIDs = user.degrees ? Object.keys(user.degrees) : [];
    const degrees = user.degrees ? Object.values(user.degrees) : [];

    const handleDeleteEstudio = () => {
        reBase.remove(`users/${currentUser.uid}/degrees/${removeEstudioButtonID}`
            , error => console.log(error));

        setShowRemoveEstudioDialog(false);
    };

    return (
        <Fade in timeout={325}>
            <div className={styles.wrapper}>
                <div
                    variant='subtitle1'
                    className={styles.wrapperTitle}
                >
                    Estudios y títulos
            </div>

                {
                    degrees.map((estudio, index) => {
                        const estudioID = estudiosIDs[index]

                        const startDate = new Date(estudio.startDate);
                        const endDate = new Date(estudio.endDate);

                        return (
                            <div
                                key={index}
                                className={styles.estudioWrapper}
                                onMouseEnter={() => {
                                    setRemoveEstudioButtonID(estudioID);
                                    setShowRemoveEstudioButton(true);
                                }}
                                onMouseLeave={() => setShowRemoveEstudioButton(false)}
                            >
                                <div
                                    className={styles.estudioImage}
                                    style={{
                                        backgroundImage: `url(${estudio.institutionImageURL})`,
                                        ...(
                                            !estudio.institutionImageURL &&
                                            {
                                                backgroundColor: cssColors.yellow,
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
                                        !estudio.institutionImageURL &&
                                        <FaSchool />
                                    }
                                </div>
                                <div className={styles.estudioInfo}>
                                    <div>
                                        <b>{estudio.titleObtained}</b>,
                                        {`en ${estudio.institutionName}`}
                                    </div>

                                    <div>
                                        <small>
                                            {`
                                            Desde ${startDate.getFullYear()}, 
                                            hasta ${endDate.getFullYear()}, 
                                            `}
                                            <span className={styles.estudioLocation}>
                                                {estudio.location}
                                            </span>
                                        </small>
                                    </div>
                                </div>

                                {
                                    (showRemoveEstudioButton && (removeEstudioButtonID === estudioID)) &&
                                    <Fade in>
                                        <div
                                            className={styles.removeEstudioButton}
                                            onClick={() => setShowRemoveEstudioDialog(true)}
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
                    !user.degrees &&
                    <div className={styles.noEstudioView}>
                        <Typography variant='caption'>
                            No se han agredado títulos académicos.
                    </Typography>
                    </div>
                }

                {
                    !urlUserID &&
                    <AddItemButton
                        text='Añadir título académico'
                        clicked={() => setAddEstudioDialogOpen(true)}
                    />
                }


                {
                    //*******/
                    //DIALOGS
                    //*******/
                }

                <AddEstudioDialogProvider>
                    <AddEstudioDialog />
                </AddEstudioDialogProvider>

                <ConfirmDeleteDialog
                    isOpen={showRemoveEstudioDialog}
                    close={() => setShowRemoveEstudioDialog(false)}
                    confirm={() => handleDeleteEstudio()}
                    title='Confirmar eliminación.'
                    message='¿Estas seguro de querer borrar este artículo?'
                />

            </div>
        </Fade>
    );
}

export default Estudios;