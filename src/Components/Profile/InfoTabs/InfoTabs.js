import React, { Component } from 'react';
import {
    AppBar,
    Tabs,
    Tab,
    Tooltip
} from '@material-ui/core';
import * as Ionicons from 'react-icons/io';

import styles from './InfoTabs.module.scss';

import Experiencia from './Experiencia/Experiencia';
import Estudios from './Estudios/Estudios';
import Tecnologias from './Tecnologias/Tecnologias';

class InfoTabs extends Component {
    state = {
        tabValue: 0
    }

    changeTab = (value) => this.setState({ tabValue: value });

    render() {
        const value = this.state.tabValue;

        const menuTabs = [
            {
                title: 'Experiencia laboral',
                icon: 'IoIosMedal',
            },
            {
                title: 'Estudios y títulos',
                icon: 'IoIosSchool',
            },
            {
                title: 'Lenguajes y tecnologías',
                icon: 'IoIosConstruct'
            }
        ];

        return (
            <div>
                <AppBar
                    position="static"
                    className={styles.tabsBar}
                >
                    <Tabs
                        value={this.state.tabValue}
                        onChange={(e, index) => this.changeTab(index)}
                        variant="scrollable"
                        scrollButtons="off"
                    >
                        {
                            menuTabs.map(tab => {
                                const Icon = Ionicons[tab.icon];

                                return (
                                    <Tooltip
                                        key={tab.title}
                                        title={tab.title}
                                    >
                                        <Tab
                                            icon={<Icon className={styles.tabIcon} />}
                                        >
                                        </Tab>
                                    </Tooltip>
                                );
                            })
                        }
                    </Tabs>
                </AppBar>
                {value === 0 && <Experiencia />}
                {value === 1 && <Estudios />}
                {value === 2 && <Tecnologias />}
            </div>
        );
    }
}

export default InfoTabs;