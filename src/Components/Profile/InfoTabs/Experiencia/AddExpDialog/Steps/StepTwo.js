import React, { useContext } from 'react';
import styles from './Steps.module.scss';
import { Divider, Slide, Grid, Typography, TextField } from '@material-ui/core';
import { AddExpDialogContext } from './../AddExpDialogContext';

const StepTwo = ({ direction }) => {
    const {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        stillWorkingHere,
        setStillWorkingHere
    } = useContext(AddExpDialogContext);

    const handleDateChange = event => {
        event.target.name === 'startDate' ?
            setStartDate(event.target.value)
            : setEndDate(event.target.value);
    };

    return (
        <Slide
            in
            direction={direction}
            timeout={400}
        >
            <Grid container>
                <Grid item xs={6}>
                    <div className={styles.inputBlock}>
                        <Typography
                            className={styles.inputBlockTitle}
                            variant='caption'
                        >
                            ¿En que fecha iniciaste este empleo?
                        </Typography>

                        <Divider style={{ margin: '1rem 0' }} />

                        <TextField
                            name='startDate'
                            label='Fecha de inicio'
                            type='date'
                            value={startDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={event => handleDateChange(event)}
                        />
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div className={styles.inputBlock}>
                        <Typography
                            className={styles.inputBlockTitle}
                            variant='caption'
                        >
                            ¿En que fecha dejaste este empleo?
                        </Typography>

                        <Divider style={{ margin: '1rem 0' }} />

                        <TextField
                            name='endDate'
                            label='Fecha de salida'
                            disabled={stillWorkingHere}
                            type='date'
                            value={endDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={event => handleDateChange(event)}
                        />

                        <div className={styles.currentlyWorkingHere}>
                            <small>Sigo trabajando aquí</small>
                            <input
                                type='checkbox'
                                checked={stillWorkingHere}
                                onChange={event => setStillWorkingHere(event.currentTarget.checked)}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Slide>
    );
}

export default StepTwo;