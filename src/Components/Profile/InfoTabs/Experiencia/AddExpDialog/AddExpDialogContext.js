import React, { useState } from 'react';

const AddExpDialogContext = React.createContext();

const AddExpDialogProvider = (props) => {
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

    return (
        <AddExpDialogContext.Provider
            value={{
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
                setErrorDialog
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