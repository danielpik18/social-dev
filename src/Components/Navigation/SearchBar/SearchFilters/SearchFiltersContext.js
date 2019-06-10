import React, { useState } from 'react';

const SearchFiltersContext = React.createContext();

const SearchFiltersProvider = (props) => {
    const [devName, setDevName] = useState('');
    const [techTags, setTechTags] = useState(null);
    const [expYearsMin, setExpYearsMin] = useState(null);
    const [expYearsMax, setExpYearsMax] = useState(null);
    const [minRating, setMinRating] = useState(0);

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
                setExpYearsMax,
                minRating,
                setMinRating,
                devName,
                setDevName
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