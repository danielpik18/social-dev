import React, { Component } from 'react';
import {
    IconButton,
    Paper,
    InputBase,
    Dialog
} from '@material-ui/core';

import {Link} from 'react-router-dom';

import { IoMdOptions, IoIosSearch } from 'react-icons/io';
import styles from './SearchBar.module.scss';
import SearchFilters from './SearchFilters/SearchFilters';

class SearchBar extends Component {
    state = {
        filterDialogOpen: false,
        selectedFilter: 0
    }

    toggleFilterDialog = () => this.setState({
        filterDialogOpen: !this.state.filterDialogOpen
    });

    render() {
        const techs = [
            'React JS',
            'Node JS',
            'PHP',
            'Angular JS'
        ];

        return (
            <>
                <Paper className={styles.searchBar}>
                    <IconButton onClick={this.toggleFilterDialog}>
                        <IoMdOptions />
                    </IconButton>
                    <InputBase placeholder="Buscar personas" />

                    <Link to='/search'>
                        <IconButton>
                            <IoIosSearch />
                        </IconButton>
                    </Link>
                </Paper>

                <Dialog
                    open={this.state.filterDialogOpen}
                    onBackdropClick={this.toggleFilterDialog}
                >
                    <SearchFilters
                        selectedFilter={this.state.selectedFilter}
                        change={this.changeFilterTab}
                    />
                </Dialog>
            </>
        );
    }
}

export default SearchBar;