import React, { useContext } from 'react';
import styles from './Steps.module.scss';
import { TextField, Divider, Slide, Typography } from '@material-ui/core';
import { IoIosMedal } from 'react-icons/io';
import { AddExpDialogContext } from '../AddExpDialogContext';

const StepFour = ({ direction }) => {
    const { jobTitle, setJobTitle } = useContext(AddExpDialogContext);

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
                        ¿Cual era el título del puesto que ocupabas?
                    </Typography>
                </div>

                <Divider style={{ margin: '1rem 0' }} />

                <TextField
                    variant='outlined'
                    label='Título del puesto'
                    value={jobTitle}
                    placeholder='Ej. Desarrollador Web, Back End'
                    fullWidth
                    onChange={event => setJobTitle(event.currentTarget.value)}
                />
            </div>
        </Slide>
    );
}

export default StepFour;