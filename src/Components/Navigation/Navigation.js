import React, { Component } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    ClickAwayListener
} from '@material-ui/core';
import styles from './Navigation.module.scss';

import { IoIosMenu } from 'react-icons/io';
import SideDrawer from './SideDrawer/SideDrawer';

class Navigation extends Component {
    state = {
        isDrawerOpen: true
    }

    toggleDrawer = () => this.setState({
        isDrawerOpen: !this.state.isDrawerOpen
    });

    render() {
        return (
            <>
                <AppBar position='static' >
                    <Toolbar className={styles.wrapper}>
                        <IconButton onClick={this.toggleDrawer}>
                            <IoIosMenu className={styles.menuIcon} />
                        </IconButton>

                        <span>SocialDev</span>

                        <Button color='inherit'>
                            Login
                        </Button>
                    </Toolbar>
                </AppBar>

                <SideDrawer isOpen={this.state.isDrawerOpen} toggle={this.toggleDrawer} />
            </>
        );
    }
}

export default Navigation;