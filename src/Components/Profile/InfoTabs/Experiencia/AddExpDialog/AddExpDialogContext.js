import React, { useState } from 'react';

const AddExpDialogContext = React.createContext();

const AddExpDialogProvider = (props) => {
    const [activeStep, setActiveStep] = useState(0);

    const [enterpriseName, setEnterpriseName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [enterpriseImageURL, setEnterpriseImageURL] = useState('');
    const [stillWorkingHere, setStillWorkingHere] = useState(false);

    const [errorDialog, setErrorDialog] = useState({
        open: false,
        message: ''
    });

    const resetState = () => {
        setActiveStep(0);
        setEnterpriseName('');
        setStartDate('');
        setEndDate('');
        setLocation('');
        setJobTitle('');
        setEnterpriseImageURL('');
        setStillWorkingHere(false);
        setErrorDialog({
            open: false,
            message: ''
        })
    };

    return (
        <AddExpDialogContext.Provider
            value={{
                activeStep,
                setActiveStep,
                enterpriseName,
                setEnterpriseName,
                jobTitle,
                setJobTitle,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                location,
                setLocation,
                enterpriseImageURL,
                setEnterpriseImageURL,

                stillWorkingHere,
                setStillWorkingHere,

                errorDialog,
                setErrorDialog,

                resetState
            }}
        >
            {props.children}
        </AddExpDialogContext.Provider>
    )
};

export {
    AddExpDialogContext,
    AddExpDialogProvider
}