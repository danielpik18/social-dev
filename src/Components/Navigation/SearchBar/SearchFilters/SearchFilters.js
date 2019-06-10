import React, { useState } from 'react';

import {
    Tabs,
    Tab,
    AppBar
} from '@material-ui/core';

import styles from './SearchFilters.module.scss';
import Experiencia from './Experiencia/Experiencia';
import FilterTechTags from './FilterTechTags/FilterTechTags';
import Rating from './Rating/Rating';

const SearchFilters = () => {
    const [selectedFilter, setSelectedFilter] = useState(0);

    return (
        <div className={styles.filtersWrapper}>
            <span className={styles.filtersTitle}>
                Filtrar según:
            </span>

            <AppBar
                position='static'
                className={styles.filtersBar}
            >
                <Tabs
                    centered
                    value={selectedFilter}
                    onChange={(e, index) => setSelectedFilter(index)}
                >
                    <Tab label='Puntaje' />
                    <Tab label='Experiencia' />
                    <Tab label='Tecnologías' />
                </Tabs>
            </AppBar>

            <div className={styles.filterTabWrapper}>
                {selectedFilter === 0 && <Rating />}
                {selectedFilter === 1 && <Experiencia />}
                {selectedFilter === 2 && <FilterTechTags />}
            </div>
        </div>
    );
}

export default SearchFilters;