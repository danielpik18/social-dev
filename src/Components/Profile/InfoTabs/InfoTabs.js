import React, { useState, useContext } from 'react';
import {
    AppBar,
    Tabs,
    Tab,
    Tooltip
} from '@material-ui/core';
import * as Ionicons from 'react-icons/io';

import styles from './InfoTabs.module.scss';
import cssColors from './../../../scss/_colors.scss';

import Experiencia from './Experiencia/Experiencia';
import Estudios from './Estudios/Estudios';
import { ProfileContext } from '../ProfileContext';
import { ExperienciaProvider } from './Experiencia/ExperienciaContext';
import { EstudiosProvider } from './Estudios/EstudiosContext';
import TechPicker from '../../TechPicker/TechPicker';
import SavedDevs from './SavedDevs/SavedDevs';

const InfoTabs = () => {
    const [tabValue, setTabValue] = useState(0);

    const { user, urlUserID } = useContext(ProfileContext);

    const changeTab = (value) => setTabValue(value);

    const renderDevTab = () => {
        switch (tabValue) {
            case 0:
                return (
                    <ExperienciaProvider>
                        <Experiencia />
                    </ExperienciaProvider>
                )
            case 1:
                return (
                    <EstudiosProvider>
                        <Estudios />
                    </EstudiosProvider>
                )
            case 2: return <TechPicker />
            default:
                break;
        }
    };

    const renderRecruiterTab = () => {
        switch (tabValue) {
            case 0:
                return (
                    <SavedDevs />
                )
            default:
                break;
        }
    }

    const menuTabs = [
        {
            display: user.role === 'Desarrollador',
            title: 'Experiencia laboral',
            icon: 'IoIosMedal',
        },
        {
            display: user.role === 'Desarrollador',
            title: 'Estudios y títulos',
            icon: 'IoIosSchool',
        },
        {
            display: user.role === 'Desarrollador',
            title: 'Lenguajes y tecnologías',
            icon: 'IoIosConstruct'
        },
        {
            display: (!urlUserID && (user.role === 'Reclutador')),
            title: 'Desarrolladores guardados',
            icon: 'IoIosConstruct'
        }
    ];

    return (
        <div className={styles.tabsWrapper}>
            <AppBar
                position="static"
                style={{
                    backgroundColor: user.role === 'Desarrollador'
                        ? cssColors.blueDark : cssColors.purpleDark
                }}
            >
                <Tabs
                    value={tabValue}
                    onChange={(e, index) => changeTab(index)}
                    variant="scrollable"
                    scrollButtons="off"
                >
                    {
                        menuTabs.map(tab => {
                            if (tab.display) {
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
                            }
                            else {
                                return null;
                            }
                        })
                    }
                </Tabs>
            </AppBar>

            {
                user.role === 'Desarrollador'
                    ? renderDevTab() : renderRecruiterTab()
            }
        </div>
    );
}


export default InfoTabs;