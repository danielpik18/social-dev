import React from 'react';
import styles from './Steps.module.scss';
import { TextField, Divider, Slide } from '@material-ui/core';

const StepOne = ({ direction }) => {
    return (
        <Slide
            in
            direction={direction}
            timeout={400}
        >
            <div className={styles.inputBlock}>
                <span className={styles.inputBlockTitle}>
                    ¿En donde trabajaste?
            </span>

                <Divider style={{ margin: '1rem 0' }} />

                <TextField
                    variant='outlined'
                    label='Nombre de la empresa'
                    fullWidth
                />
            </div>
        </Slide>
    );
}

export default StepOne;