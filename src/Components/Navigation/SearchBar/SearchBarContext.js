import React, { useState } from 'react';

const SearchBarContext = React.createContext();

const SearchBarProvider = (props) => {
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);

    return (
        <SearchBarContext.Provider
            value={{
                filterDialogOpen,
                setFilterDialogOpen
            }}
        >
            {props.children}
        </SearchBarContext.Provider>
    )
};

export {
    SearchBarContext,
    SearchBarProvider
}