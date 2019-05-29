import React, { useContext } from 'react';
import styles from './Steps.module.scss';
import { TextField, Divider, Slide, Typography } from '@material-ui/core';
import { MdLocationOn } from 'react-icons/md';
import { AddExpDialogContext } from '../AddExpDialogContext';

const StepThree = ({ direction }) => {
    const {location, setLocation} = useContext(AddExpDialogContext);

    return (
        <Slide
            in
            direction={direction}
            timeout={400}
        >
            <div className={styles.inputBlock}>
                <div className={styles.inputBlockTitleWrapper}>
                    <MdLocationOn className={styles.inputBlockIcon} />
                    <Typography
                        className={styles.inputBlockTitle}
                        variant='h6'
                    >
                        ¿Donde trabajaste?
                    </Typography>
                </div>

                <Divider style={{ margin: '1rem 0' }} />

                <TextField
                    variant='outlined'
                    label='Localidad del empleo'
                    value={location}
                    placeholder='Ej. Barranquilla, Colombia'
                    fullWidth
                    onChange={event => setLocation(event.currentTarget.value)}
                />
            </div>
        </Slide>
    );
}

export default StepThree;