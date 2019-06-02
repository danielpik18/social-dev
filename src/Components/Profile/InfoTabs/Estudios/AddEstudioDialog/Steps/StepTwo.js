import React, { useContext } from 'react';
import styles from './Steps.module.scss';
import { Divider, Slide, Grid, Typography, TextField } from '@material-ui/core';
import { AddEstudioDialogContext } from './../AddEstudioDialogContext';

const StepTwo = ({ direction }) => {
    const {
        startDate,
        setStartDate,
        endDate,
        setEndDate
    } = useContext(AddEstudioDialogContext);

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
                            ¿En que fecha iniciaste empezaste a estudiar?
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
                            ¿En que fecha culminaste estos estudios?
                        </Typography>

                        <Divider style={{ margin: '1rem 0' }} />

                        <TextField
                            name='endDate'
                            label='Fecha de culminación'
                            type='date'
                            value={endDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={event => handleDateChange(event)}
                        />

                    </div>
                </Grid>
            </Grid>
        </Slide>
    );
}

export default StepTwo;