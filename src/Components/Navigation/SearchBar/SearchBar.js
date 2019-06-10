import React, { useContext, useState } from 'react';
import {
    IconButton,
    Paper,
    InputBase,
    Dialog
} from '@material-ui/core';

import { Link } from 'react-router-dom';

import { IoMdOptions, IoIosSearch } from 'react-icons/io';
import styles from './SearchBar.module.scss';
import SearchFilters from './SearchFilters/SearchFilters';
import { SearchBarContext } from './SearchBarContext';
import { SearchFiltersContext } from './SearchFilters/SearchFiltersContext';

const SearchBar = () => {
    const {
        filterDialogOpen,
        setFilterDialogOpen
    } = useContext(SearchBarContext);
    const {
        techTags,
        expYearsMin,
        expYearsMax,
        minRating,
        devName,
        setDevName
    } = useContext(SearchFiltersContext);

    const [searchButtonRef, setSearchButtonRef] = useState(null);

    const minRatingParam = minRating ? minRating : 'null';
    const techTagsParam = techTags ? techTags.join(',') : 'null';
    const expYearsRange = (
        ((expYearsMin || expYearsMin === 0) || expYearsMax)
            ? `${expYearsMin ? expYearsMin : 0}-${expYearsMax ? expYearsMax : 50}`
            : 'null'
    );

    const link = `/search/${minRatingParam}/${expYearsRange}/${techTagsParam}`;

    const handleKeyPressed = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchButtonRef.click();
        }
    };

    return (
        <>
            <Paper className={styles.searchBar}>
                <IconButton onClick={() => setFilterDialogOpen(true)}>
                    <IoMdOptions className={styles.searchBarIcon} />
                </IconButton>

                <InputBase
                    value={devName}
                    onChange={e => setDevName(e.currentTarget.value)}
                    placeholder="Buscar desarrolladores"
                    onKeyDown={e => handleKeyPressed(e)}
                    style={{
                        width: '100%'
                    }}
                />

                <Link to={link}>
                    <IconButton ref={ref => setSearchButtonRef(ref)}>
                        <IoIosSearch className={styles.searchBarIcon} />
                    </IconButton>
                </Link>
            </Paper >

            <Dialog
                maxWidth='xl'
                open={filterDialogOpen}
                onBackdropClick={() => setFilterDialogOpen(false)}
            >
                <SearchFilters />
            </Dialog>
        </>
    );
}

export default SearchBar;