import React, { useState } from 'react';

const AddEstudioDialogContext = React.createContext();

const AddEstudioDialogProvider = (props) => {
    const [activeStep, setActiveStep] = useState(0);

    const [institutionImageURL, setInstitutionImageURL] = useState('');
    const [institutionName, setInstitutionName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [titleObtained, setTitleObtained] = useState('');

    const [errorDialog, setErrorDialog] = useState({
        open: false,
        message: ''
    });

    const resetState = () => {
        setActiveStep(0);
        setInstitutionName('');
        setStartDate('');
        setEndDate('');
        setLocation('');
        setTitleObtained('');
        setInstitutionImageURL('');
        setErrorDialog({
            open: false,
            message: ''
        })
    };

    return (
        <AddEstudioDialogContext.Provider
            value={{
                activeStep,
                setActiveStep,
                institutionName,
                setInstitutionName,
                titleObtained,
                setTitleObtained,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                location,
                setLocation,
                institutionImageURL,
                setInstitutionImageURL,

                errorDialog,
                setErrorDialog,

                resetState
            }}
        >
            {props.children}
        </AddEstudioDialogContext.Provider>
    )
};

export {
    AddEstudioDialogContext,
    AddEstudioDialogProvider
}