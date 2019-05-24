import React from 'react';

import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@material-ui/core';

import {
    IoIosPerson,
    IoIosSearch,
    IoIosLogIn
} from 'react-icons/io';

import { Link } from 'react-router-dom';

import styles from './SideDrawer.module.scss';

const SideDrawer = ({ isOpen, toggle }) => {
    const menuOptions = [
        {
            title: 'Mi perfil',
            icon: <IoIosPerson />
        }
        /*
        {
            title: 'Ingresar',
            icon: <IoIosLogIn />
        },
        {
            title: 'Buscar desarroladores',
            icon: <IoIosSearch />
        },
        */
    ];

    return (
        <Drawer
            open={isOpen}
            onClose={toggle}
        >
            <List className={styles.drawerMenu}>
                {
                    menuOptions.map(option => (
                        <Link
                            to='/register' 
                            key={option.title}
                            style={{
                                textDecoration: 'none'
                            }}
                        >
                            <ListItem button>
                                <ListItemIcon className={styles.drawerMenuIcon}>
                                    {option.icon}
                                </ListItemIcon>
                                <span className={styles.drawerMenuText}>{option.title}</span>
                            </ListItem>
                        </Link>
                    ))
                }
            </List>
        </Drawer>
    );
}

export default SideDrawer;