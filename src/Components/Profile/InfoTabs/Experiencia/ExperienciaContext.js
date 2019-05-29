import React, { useState } from 'react';

const ExperienciaContext = React.createContext();

const ExperienciaProvider = (props) => {
    const [addExpDialogOpen, setAddExpDialogOpen] = useState(false);

    return (
        <ExperienciaContext.Provider
            value={{
                addExpDialogOpen,
                setAddExpDialogOpen
            }}
        >
            {props.children}
        </ExperienciaContext.Provider>
    )
};

export {
    ExperienciaContext,
    ExperienciaProvider
}