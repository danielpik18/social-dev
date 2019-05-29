import React from 'react';
import styles from './Steps.module.scss';
import { TextField, Divider, Slide, Grid } from '@material-ui/core';

const StepTwo = ({ direction }) => {
    return (
        <Slide
            in
            direction={direction}
            timeout={400}
        >
            <Grid container>
                <Grid item xs={6}>
                    <div className={styles.inputBlock}>
                        <span className={styles.inputBlockTitle}>
                            ¿Cuando empezaste?
                        </span>

                        <Divider style={{ margin: '1rem 0' }} />

                        <span>
                            Seleccionar fecha
                        </span>
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div className={styles.inputBlock}>
                        <span className={styles.inputBlockTitle}>
                            ¿Cuando terminaste?
                        </span>

                        <Divider style={{ margin: '1rem 0' }} />

                        <span>
                            Seleccionar fecha
                        </span>
                    </div>
                </Grid>
            </Grid>
        </Slide>
    );
}

export default StepTwo;