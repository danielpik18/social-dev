import React, { useState } from 'react';
import { Dialog, TextField, Divider, Grid, MobileStepper, Button } from '@material-ui/core';
import styles from './AddExpDialog.module.scss';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';

const AddExpDialog = ({ isOpen, toggle }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [stepDirection, setStepDirection] = useState('right');

    const handleStepChange = (direction) => {
        if (direction === 'forward') {
            setActiveStep(activeStep + 1);
            setStepDirection('left');
        } else {
            setActiveStep(activeStep - 1);
            setStepDirection('right');
        }
    }

    return (
        <Dialog
            open={isOpen}
            onClose={() => toggle(false)}
        >
            <div className={styles.wrapper}>
                {activeStep === 0 && <StepOne direction={stepDirection} />}
                {activeStep === 1 && <StepTwo direction={stepDirection} />}

                <MobileStepper
                    className={styles.steppers}
                    variant='progress'
                    steps={6}
                    position='static'
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size='small'
                            onClick={() => handleStepChange('forward')}
                            disabled={activeStep === 5}
                        >
                            Next
                        </Button>
                    }
                    backButton={
                        <Button
                            size='small'
                            onClick={() => handleStepChange('back')}
                            disabled={activeStep === 0}
                        >
                            Back
                        </Button>
                    }
                />
            </div>
        </Dialog>
    );
}

export default AddExpDialog;