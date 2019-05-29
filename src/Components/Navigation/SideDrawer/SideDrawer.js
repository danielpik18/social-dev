import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
} from '@material-ui/core';

import {
    IoIosPerson,
    IoIosLogIn,
    IoIosLogOut
} from 'react-icons/io';

import { Link } from 'react-router-dom';

import { fire } from './../../../firebase';

import styles from './SideDrawer.module.scss';

const SideDrawer = ({ isOpen, toggle, userAuth }) => {
    const menuOptions = [
        ...(
            userAuth ?
                [
                    {
                        title: 'Mi perfil',
                        icon: <IoIosPerson />,
                        path: `/profile`,
                    }
                ] : []
        ),
        ...(
            !userAuth ?
                [
                    {
                        title: 'Ingresar',
                        icon: <IoIosLogIn />,
                        path: '/login'
                    }
                ] : []
        ),
        ...(
            userAuth ?
                [
                    {
                        title: 'Log out',
                        icon: <IoIosLogOut />,
                        path: '/login',
                        clicked: () => {
                            fire.auth().signOut();
                            toggle();
                        }
                    }
                ] : []
        ),
        {
            title: 'test',
            icon: <IoIosLogIn />,
            path: '/profileUppcooehiFUzPAHVav9ek2ot7Q23'
        }
    ];

    return (
        <Drawer
            open={isOpen}
            onClose={toggle}
        >
            <List className={styles.drawerMenu}>
                {
                    menuOptions.map(option => (
                        option &&
                        <Link
                            to={option.path}
                            key={option.title}
                            style={{
                                textDecoration: 'none',
                                width: '100%',
                                textAlign: 'center'
                            }}
                            onClick={option.clicked ? option.clicked : toggle}

                        >
                            <ListItem button >
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