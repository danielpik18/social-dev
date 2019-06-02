import React, { useState } from 'react';

const EstudiosContext = React.createContext();

const EstudiosProvider = (props) => {
    const [addEstudioDialogOpen, setAddEstudioDialogOpen] = useState(false);

    return (
        <EstudiosContext.Provider
            value={{
                addEstudioDialogOpen,
                setAddEstudioDialogOpen
            }}
        >
            {props.children}
        </EstudiosContext.Provider>
    )
};

export {
    EstudiosContext,
    EstudiosProvider
}