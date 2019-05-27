import React, { Component } from 'react';
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

import { AuthContext } from './../../Contexts/AuthContext';


class Navigation extends Component {
    state = {
        isDrawerOpen: false
    }

    toggleDrawer = () => this.setState({
        isDrawerOpen: !this.state.isDrawerOpen
    });

    render() {
        return (
            <>
                <AppBar position='sticky' >
                    <Toolbar className={styles.wrapper}>
                        <Link to='/'>
                            <div className={styles.logo}></div>
                        </Link>

                        <SearchBar />

                        <IconButton onClick={this.toggleDrawer}>
                            <IoIosMenu className={styles.menuIcon} />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <AuthContext.Consumer>
                    {context => {
                        return (
                            <SideDrawer
                                isOpen={this.state.isDrawerOpen}
                                toggle={this.toggleDrawer}
                                userAuth={context.currentUser !== null}
                            />
                        );
                    }}
                </AuthContext.Consumer>
            </>
        );
    }
}

export default Navigation;