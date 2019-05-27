import React, { Component } from 'react';

import {
    Tabs,
    Tab,
    Typography,
    AppBar
} from '@material-ui/core';

import styles from './SearchFilters.module.scss';
import Experiencia from './Experiencia/Experiencia';
import Tecnologias from './Tecnologias/Tecnologias';
import Disponibilidad from './Disponibilidad/Disponibilidad';

class SearchFilters extends Component {

    state = {
        selectedFilter: 0
    }

    changeFilterTab = value => this.setState({ selectedFilter: value });

    render() {
        return (
            <div className={styles.filtersWrapper}>
                <Typography variant='h5'>
                    Filtrar según:
                </Typography>

                <AppBar
                    position='static'
                    className={styles.filtersBar}
                >
                    <Tabs
                        centered
                        value={this.state.selectedFilter}
                        onChange={(e, index) => this.changeFilterTab(index)}
                    >
                        <Tab label='Experiencia' />
                        <Tab label='Tecnologías' />
                        <Tab label='Disponibilidad' />
                    </Tabs>
                </AppBar>

                {this.state.selectedFilter === 0 && <Experiencia />}
                {this.state.selectedFilter === 1 && <Tecnologias />}
                {this.state.selectedFilter === 2 && <Disponibilidad />}
            </div>
        );
    }
}

export default SearchFilters;