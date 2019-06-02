import React, { useState, useContext } from 'react';
import { Dialog, MobileStepper, Button } from '@material-ui/core';
import styles from './AddExpDialog.module.scss';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import StepThree from './Steps/StepThree';
import StepFour from './Steps/StepFour';
import StepFive from './Steps/StepFive';

import ErrorDialog from './../../../../Dialogs/ErrorDialog/ErrorDialog';

import {
    IoMdArrowDropleft,
    IoMdArrowDropright
} from 'react-icons/io';

import { AddExpDialogContext } from './AddExpDialogContext';
import { ExperienciaContext } from '../ExperienciaContext';

const AddExpDialog = () => {
    const [stepDirection, setStepDirection] = useState('right');

    const { addExpDialogOpen, setAddExpDialogOpen } = useContext(ExperienciaContext);
    const {
        errorDialog,
        setErrorDialog,
        activeStep,
        setActiveStep
    } = useContext(AddExpDialogContext);

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
            open={addExpDialogOpen}
            onClose={() => setAddExpDialogOpen(false)}
        >
            <div className={styles.wrapper}>
                {activeStep === 0 && <StepOne direction={stepDirection} />}
                {activeStep === 1 && <StepTwo direction={stepDirection} />}
                {activeStep === 2 && <StepThree direction={stepDirection} />}
                {activeStep === 3 && <StepFour direction={stepDirection} />}
                {activeStep === 4 && <StepFive direction={stepDirection} />}

                <MobileStepper
                    className={styles.steppers}
                    variant='progress'
                    steps={5}
                    position='static'
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size='small'
                            onClick={() => handleStepChange('forward')}
                            disabled={activeStep === 4}
                        >
                            <div className={styles.steppersNav}>
                                <span>Next</span>
                                <IoMdArrowDropright className={styles.steppersNavIcon} />
                            </div></Button>
                    }
                    backButton={
                        <Button
                            size='small'
                            onClick={() => handleStepChange('back')}
                            disabled={activeStep === 0}
                        >
                            <div className={styles.steppersNav}>
                                <IoMdArrowDropleft className={styles.steppersNavIcon} />
                                <span>Back</span>
                            </div>
                        </Button>
                    }
                />

                <ErrorDialog
                    isOpen={errorDialog.open}
                    close={() => setErrorDialog({
                        ...errorDialog,
                        open: false
                    })}
                    message={errorDialog.message}
                    title='No se ha podido agregar este item.'
                />

            </div>
        </Dialog>
    );
}

export default AddExpDialog;