import React, { useContext } from 'react';
import styles from './Steps.module.scss';
import { TextField, Divider, Slide, Typography, Button } from '@material-ui/core';
import { IoIosLink, IoIosCheckmark } from 'react-icons/io';
import { AddExpDialogContext } from '../AddExpDialogContext';

import { AuthContext } from './../../../../../../Contexts/AuthContext';
import { reBase } from './../../../../../../firebase';

import validUrl from 'valid-url';
import { ExperienciaContext } from '../../ExperienciaContext';

const StepFive = ({ direction }) => {
    const { setAddExpDialogOpen } = useContext(ExperienciaContext);

    const {
        enterpriseImageURL,
        setEnterpriseImageURL,
        enterpriseName,
        jobTitle,
        startDate,
        endDate,
        location,
        stillWorkingHere,
        
        setErrorDialog
    } = useContext(AddExpDialogContext);

    const { currentUser } = useContext(AuthContext);

    const addExperience = () => {
        if (
            enterpriseName
            && startDate
            && (endDate || stillWorkingHere)
            && location
            && jobTitle
        ) {
            if (
                (enterpriseImageURL && validUrl.isUri(enterpriseImageURL))
                || !enterpriseImageURL
            ) {
                reBase.push(`users/${currentUser.uid}/experience`, {
                    data: {
                        enterpriseName,
                        jobTitle,
                        startDate,
                        endDate: !stillWorkingHere ? endDate : 'present',
                        location,
                        enterpriseImageURL
                    },
                    then: error => {
                        if (error) {
                            setErrorDialog({
                                open: true,
                                message: error
                            });
                        }
                        else setAddExpDialogOpen(false);
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
                        Ingresa un enlace de una imagen de la empresa
                    </Typography>
                </div>

                <Divider style={{ margin: '1rem 0' }} />

                <TextField
                    variant='outlined'
                    value={enterpriseImageURL}
                    onChange={(event) => setEnterpriseImageURL(event.currentTarget.value)}
                    label='URL logo de la empresa ( opcional )'
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