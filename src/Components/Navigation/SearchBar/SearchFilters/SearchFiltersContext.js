import React, { useState, useEffect } from 'react';

const SearchFiltersContext = React.createContext();

const SearchFiltersProvider = (props) => {
    const [techTags, setTechTags] = useState(null);
    const [expYearsMin, setExpYearsMin] = useState(0);
    const [expYearsMax, setExpYearsMax] = useState(50);

    const [searchFilters, setSearchFilters] = useState([]);

    return (
        <SearchFiltersContext.Provider
            value={{
                searchFilters,
                setSearchFilters,
                techTags,
                setTechTags,
                expYearsMin,
                setExpYearsMin,
                expYearsMax,
                setExpYearsMax
            }}
        >
            {props.children}
        </SearchFiltersContext.Provider>
    )
};

export {
    SearchFiltersContext,
    SearchFiltersProvider
}