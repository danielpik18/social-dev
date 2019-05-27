import React from 'react';
import { Typography, TextField, Divider } from '@material-ui/core';
import styles from './Experiencia.module.scss';

const Experiencia = () => {
    return (
        <div className={styles.expWrapper}>
            <Typography variant='h6'>
                Años de experiencia
            </Typography>

            <div className={styles.inputBlock}>
                <Typography>Entre</Typography>
                <TextField
                    className={styles.textField}
                    type='number'
                    placeholder='4'
                />
                <Typography>y</Typography>
                <TextField
                    className={styles.textField}
                    type='number'
                    placeholder='10'
                />
            </div>
        </div>
    );
}

export default Experiencia;