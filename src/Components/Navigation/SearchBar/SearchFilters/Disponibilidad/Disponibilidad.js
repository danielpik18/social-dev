import React from 'react';
import { Typography, TextField } from '@material-ui/core';
import styles from './Disponibilidad.module.scss';

const Disponibilidad = () => {
    return (
        <div className={styles.expWrapper}>
            <Typography variant='h6'>
                Disponibilidad entre
            </Typography>

            <div className={styles.inputBlock}>
                <Typography>Entre</Typography>
                <TextField
                    className={styles.textField}
                    type='number'
                    placeholder='60%'
                />
                <Typography>y</Typography>
                <TextField
                    className={styles.textField}
                    type='number'
                    placeholder='100%'
                />
            </div>
        </div>
    );
}

export default Disponibilidad;