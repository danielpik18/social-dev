import React, { useContext } from 'react';
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
    const { techTags, expYearsMin, expYearsMax } = useContext(SearchFiltersContext);

    const techTagsParam = techTags && techTags.join(',');

    const expYearsRange = (
        (expYearsMin && expYearsMax)
        && `${expYearsMin}-${expYearsMax}`
    );

    let link = `/search`;

    if ((techTags && techTags.length > 0) && expYearsRange) {
        link = `/search/${techTagsParam}/${expYearsRange}`;
    }
    else if ((techTags && techTags.length > 0) && !expYearsRange) {
        link = `/search/${techTagsParam}`;
    }
    else if ((!techTags || techTags.length === 0) && expYearsRange) {
        link = `/search/null/${expYearsRange}`;
    }

    return (
        <>
            <Paper className={styles.searchBar}>
                <IconButton onClick={() => setFilterDialogOpen(true)}>
                    <IoMdOptions />
                </IconButton>
                <InputBase placeholder="Buscar personas" />

                <Link to={link}>
                    <IconButton>
                        <IoIosSearch />
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