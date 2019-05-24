import React from 'react';

import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@material-ui/core';

import { IoIosPerson, IoIosSearch } from 'react-icons/io';
import styles from './SideDrawer.module.scss';

const SideDrawer = ({ isOpen, toggle }) => {
    const menuOptions = [
        {
            title: 'Mi perfil',
            icon: <IoIosPerson />
        },
        {
            title: 'Buscar desarroladores',
            icon: <IoIosSearch />
        },
    ];

    return (
        <Drawer
            open={isOpen}
            onClose={toggle}
        >
            <List>
                {
                    menuOptions.map(option => (
                        <ListItem button key={option.title}>
                            <ListItemIcon className={styles.menuItemIcon}>
                                {option.icon}
                            </ListItemIcon>
                            <ListItemText
                                className={styles.menuItemIcon}
                                primary={option.title}
                            />
                        </ListItem>
                    ))
                }
            </List>
        </Drawer>
    );
}

export default SideDrawer;