import React, { useContext } from 'react';
import styles from './Steps.module.scss';
import { TextField, Divider, Slide, Typography } from '@material-ui/core';
import { IoIosMedal } from 'react-icons/io';
import { AddEstudioDialogContext } from './../AddEstudioDialogContext';

const StepFour = ({ direction }) => {
    const { titleObtained, setTitleObtained } = useContext(AddEstudioDialogContext);

    return (
        <Slide
            in
            direction={direction}
            timeout={400}
        >
            <div className={styles.inputBlock}>
                <div className={styles.inputBlockTitleWrapper}>
                    <IoIosMedal className={styles.inputBlockIcon} />
                    <Typography
                        className={styles.inputBlockTitle}
                        variant='subtitle2'
                    >
                        ¿Qué título obtuviste?
                    </Typography>
                </div>

                <Divider style={{ margin: '1rem 0' }} />

                <TextField
                    variant='outlined'
                    label='Título del puesto'
                    value={titleObtained}
                    placeholder='Ej. Ingeniero de sistemas'
                    fullWidth
                    onChange={event => setTitleObtained(event.currentTarget.value)}
                />
            </div>
        </Slide>
    );
}

export default StepFour;