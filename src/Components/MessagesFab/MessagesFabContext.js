import React, { useState } from 'react';

const MessagesFabContext = React.createContext();

const MessagesFabProvider = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false);

    return (
        <MessagesFabContext.Provider
            value={{
                popoverOpen,
                setPopoverOpen
            }}
        >
            {props.children}
        </MessagesFabContext.Provider>
    )
};

export {
    MessagesFabContext,
    MessagesFabProvider
}