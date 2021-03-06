import React, { useContext } from 'react';
import styles from './Steps.module.scss';
import { TextField, Divider, Slide, Typography } from '@material-ui/core';
import { IoIosBusiness } from 'react-icons/io';
import { AddExpDialogContext } from '../AddExpDialogContext';

const StepOne = ({ direction }) => {
    const { enterpriseName, setEnterpriseName } = useContext(AddExpDialogContext);

    return (
        <Slide
            in
            direction={direction}
            timeout={400}
        >
            <div className={styles.inputBlock}>
                <div className={styles.inputBlockTitleWrapper}>
                    <IoIosBusiness className={styles.inputBlockIcon} />
                    <Typography
                        className={styles.inputBlockTitle}
                        variant='h6'
                    >
                        ¿En que empresa trabajaste?
                    </Typography>
                </div>

                <Divider style={{ margin: '1rem 0' }} />

                <TextField
                    variant='outlined'
                    label='Nombre de la empresa'
                    value={enterpriseName}
                    placeholder='Ej. Microsoft'
                    fullWidth
                    onChange={(event) => setEnterpriseName(event.currentTarget.value)}
                />
            </div>
        </Slide>
    );
}

export default StepOne;