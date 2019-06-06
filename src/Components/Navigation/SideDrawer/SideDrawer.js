import React, { useContext } from 'react';
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

import { TiEdit } from 'react-icons/ti';

import { Link } from 'react-router-dom';

import { fire } from './../../../firebase';

import styles from './SideDrawer.module.scss';
import { AuthContext } from '../../../Contexts/AuthContext';
import { MessagesFabContext } from '../../MessagesFab/MessagesFabContext';
import { MessagesPopoverContext } from './../../MessagesFab/MessagesPopover/MessagesPopoverContext';

const SideDrawer = ({ isOpen, toggle }) => {
    const { currentUser } = useContext(AuthContext);
    const { setPopoverOpen } = useContext(MessagesFabContext);
    const { setCurrentView } = useContext(MessagesPopoverContext)

    const menuOptions = [
        ...(
            currentUser ?
                [
                    {
                        title: 'Mi perfil',
                        icon: <IoIosPerson />,
                        path: `/profile`,
                    }
                ] : []
        ),
        ...(
            !currentUser ?
                [
                    {
                        title: 'Ingresar',
                        icon: <IoIosLogIn />,
                        path: '/login'
                    }
                ] : []
        ),
        ...(
            !currentUser ?
                [
                    {
                        title: 'Registrarse',
                        icon: <TiEdit />,
                        path: '/'
                    }
                ] : []
        ),
        ...(
            currentUser ?
                [
                    {
                        title: 'Log out',
                        icon: <IoIosLogOut />,
                        path: '/',
                        clicked: () => {
                            //RESET ALL APP STATE ON LOG OUT ! ! !

                            setPopoverOpen(false);
                            setCurrentView('conversationsList');

                            fire.auth().signOut();
                            toggle();
                        }
                    }
                ] : []
        )
    ];

    return (
        <Drawer
            open={isOpen}
            onClose={() => toggle(false)}
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
                            onClick={option.clicked ? option.clicked : () => toggle(false)}

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