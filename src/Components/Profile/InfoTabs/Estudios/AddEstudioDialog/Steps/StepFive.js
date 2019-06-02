import React, { useContext } from 'react';
import styles from './Steps.module.scss';
import { TextField, Divider, Slide, Typography, Button } from '@material-ui/core';
import { IoIosLink, IoIosCheckmark } from 'react-icons/io';
import { AddEstudioDialogContext } from './../AddEstudioDialogContext';

import { AuthContext } from './../../../../../../Contexts/AuthContext';
import { reBase } from './../../../../../../firebase';

import validUrl from 'valid-url';
import { EstudiosContext } from '../../EstudiosContext';

const StepFive = ({ direction }) => {
    const { setAddEstudioDialogOpen } = useContext(EstudiosContext);

    const {
        institutionImageURL,
        setInstitutionImageURL,
        institutionName,
        titleObtained,
        startDate,
        endDate,
        location,

        setErrorDialog,

        resetState
    } = useContext(AddEstudioDialogContext);

    const { currentUser } = useContext(AuthContext);

    const addExperience = () => {
        if (
            institutionName
            && startDate
            && endDate
            && location
            && titleObtained
        ) {
            if (
                (institutionImageURL && validUrl.isUri(institutionImageURL))
                || !institutionImageURL
            ) {
                reBase.push(`users/${currentUser.uid}/degrees`, {
                    data: {
                        institutionName,
                        titleObtained,
                        startDate,
                        endDate,
                        location,
                        institutionImageURL
                    },
                    then: error => {
                        if (error) {
                            setErrorDialog({
                                open: true,
                                message: error
                            });
                        }
                        else {
                            resetState();
                            setAddEstudioDialogOpen(false);
                        };
                    }
                });
            }
            else {
                setErrorDialog({
                    open: true,
                    message: 'Ingresa un enlace valido'
                });
            }
        }
        else {
            setErrorDialog({
                open: true,
                message: 'No has llenado todos los campos necesarios.'
            });
        }
    };

    return (
        <Slide
            in
            direction={direction}
            timeout={400}
        >
            <div className={styles.inputBlock}>
                <div className={styles.inputBlockTitleWrapper}>
                    <IoIosLink className={styles.inputBlockIcon} />
                    <Typography
                        className={styles.inputBlockTitle}
                        variant='subtitle2'
                    >
                        Ingresa un enlace de una imagen de la institución
                    </Typography>
                </div>

                <Divider style={{ margin: '1rem 0' }} />

                <TextField
                    variant='outlined'
                    value={institutionImageURL}
                    onChange={(event) => setInstitutionImageURL(event.currentTarget.value)}
                    label='URL logo de la institución ( opcional )'
                    fullWidth
                />

                <Button
                    className={styles.inputBlockConfirmButton}
                    onClick={addExperience}
                >
                    <div className={styles.inputBlockConfirmButtonText}>
                        <span >
                            Completar y agregar
                        </span>
                        <IoIosCheckmark
                            style={{
                                fontSize: '2.2rem'
                            }}
                        />
                    </div>
                </Button>
            </div>
        </Slide>
    );
}

export default StepFive;