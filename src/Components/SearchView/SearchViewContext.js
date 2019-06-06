import React, { useState, useContext } from 'react';
import { SearchFiltersContext } from '../Navigation/SearchBar/SearchFilters/SearchFiltersContext';

const SearchViewContext = React.createContext();

const SearchViewProvider = (props) => {
    const [searchResults, setSearchResults] = useState(null);
    const { searchFilters, setSearchFilters } = useContext(SearchFiltersContext);

    return (
        <SearchViewContext.Provider
            value={{
                searchResults,
                setSearchResults,
                searchFilters,
                setSearchFilters
            }}
        >
            {props.children}
        </SearchViewContext.Provider>
    )
};

export {
    SearchViewContext,
    SearchViewProvider
}