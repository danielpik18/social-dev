import React, { useState, useContext } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton
} from '@material-ui/core';
import styles from './Navigation.module.scss';

import { IoIosMenu } from 'react-icons/io';
import SideDrawer from './SideDrawer/SideDrawer';

import { Link } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import { SearchBarProvider } from './SearchBar/SearchBarContext';
import { SearchViewProvider } from '../SearchView/SearchViewContext';
import { AuthContext } from '../../Contexts/AuthContext';


const Navigation = () => {
    const { currentUser } = useContext(AuthContext);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <>
            <AppBar className={styles.wrapper} position='sticky' >
                <Toolbar className={styles.toolbar}>
                    <Link to='/'>
                        <div className={styles.logo}></div>
                    </Link>

                    {
                        currentUser &&
                        <SearchBarProvider>
                            <SearchViewProvider>
                                <SearchBar />
                            </SearchViewProvider>
                        </SearchBarProvider>
                    }

                    <IconButton onClick={() => setIsDrawerOpen(true)}>
                        <IoIosMenu className={styles.menuIcon} />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <SideDrawer
                isOpen={isDrawerOpen}
                toggle={setIsDrawerOpen}
            />

        </>
    );
}

export default Navigation;