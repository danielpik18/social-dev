import React, { useContext } from 'react';
import styles from './Steps.module.scss';
import { TextField, Divider, Slide, Typography } from '@material-ui/core';
import { FaSchool } from 'react-icons/fa';
import { AddEstudioDialogContext } from './../AddEstudioDialogContext';

const StepOne = ({ direction }) => {
    const { institutionName, setInstitutionName } = useContext(AddEstudioDialogContext);

    return (
        <Slide
            in
            direction={direction}
            timeout={400}
        >
            <div className={styles.inputBlock}>
                <div className={styles.inputBlockTitleWrapper}>
                    <FaSchool className={styles.inputBlockIcon} />
                    <Typography
                        className={styles.inputBlockTitle}
                        variant='h6'
                    >
                        ¿En que institución estudiaste?
                    </Typography>
                </div>

                <Divider style={{ margin: '1rem 0' }} />

                <TextField
                    variant='outlined'
                    label='Nombre de la institución'
                    value={institutionName}
                    placeholder='Ej. Universidad Auntónoma del Caribe'
                    fullWidth
                    onChange={(event) => setInstitutionName(event.currentTarget.value)}
                />
            </div>
        </Slide>
    );
}

export default StepOne;