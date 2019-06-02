import React, { useState, useEffect, useContext } from 'react';
import { reBase } from './../../firebase';
import styles from './TechPicker.module.scss';
import {
    Grid,
    Fade
} from '@material-ui/core';

import { IoIosBrowsers } from 'react-icons/io';

import {
    FaHtml5,
    FaJs,
    FaPhp,
    FaLaravel,
    FaReact,
    FaGithubSquare
} from 'react-icons/fa'

import { AuthContext } from './../../Contexts/AuthContext';
import { ProfileContext } from './../Profile/ProfileContext';
import { getBooleanKeyValuePairsFromKeys } from './../../utils/misc';
import TechBox from './TechBox/TechBox';

const TechPicker = () => {
    const { currentUser } = useContext(AuthContext);
    const { user, urlUserID } = useContext(ProfileContext);

    const [techList, setTechList] = useState(null);
    const [checkedTech, setCheckedTech] = useState(null);

    useEffect(() => {
        reBase.fetch('tech', {})
            .then((tech) => {
                setTechList(tech);
                setCheckedTech(getBooleanKeyValuePairsFromKeys(tech, false));
            })
            .catch(error => console.log(error));
    }, []);

    const handleCheck = (category, subCategory, value) => {
        const categoryCheck = (
            (category && subCategory) ? subCategory
                : category
        );

        if (category) {
            if (!subCategory) {

                //User HAS category/
                if (user.tech && user.tech[category]) {
                    const categoryArr = Object.values(user.tech[category]);

                    //User ALREADY has category/value
                    if (categoryArr.includes(value)) {
                        const userTechCategoryKeys = Object.keys(user.tech[category]);
                        let techToRemoveKey = null;

                        userTechCategoryKeys.forEach(key => {
                            const techToRemove = user.tech[category][key];

                            if (techToRemove === value) {
                                techToRemoveKey = key;
                            }
                        });

                        reBase.remove(`users/${currentUser.uid}/tech/${category}/${techToRemoveKey}`)
                    }

                    //User DOESNT have category/value
                    else {
                        reBase.push(`users/${currentUser.uid}/tech/${category}`, {
                            data: value
                        });
                    }
                }

                //User DOESNT have category/
                else {

                    reBase.push(`users/${currentUser.uid}/tech/${category}`, {
                        data: value
                    });
                }
            }
            else {
                //User HAS /category/subCategory
                if (
                    user.tech &&
                    user.tech[category] &&
                    user.tech[category][subCategory]) {

                    const userTechCategoryKeys = Object.keys(user.tech[category][subCategory]);
                    let techToRemoveKey = null;

                    userTechCategoryKeys.forEach(key => {
                        const techToRemove = user.tech[category][subCategory][key];

                        if (techToRemove === value) {
                            techToRemoveKey = key;
                        }
                    });

                    //User ALREADY has category/subcategory/value
                    if (techToRemoveKey) {
                        reBase.remove(`users/${currentUser.uid}/tech/${category}/${subCategory}/${techToRemoveKey}`)
                    }

                    //User DOESNT have category/subcategory/value
                    else {
                        reBase.push(`users/${currentUser.uid}/tech/${category}/${subCategory}`, {
                            data: value
                        });
                    }
                }
                else {
                    //User DOESNT have /category/subCategory
                    reBase.push(`users/${currentUser.uid}/tech/${category}/${subCategory}`, {
                        data: value
                    });
                }
            }
        }

        setCheckedTech({
            ...checkedTech,
            [categoryCheck]: {
                ...checkedTech[categoryCheck],
                [value]: !checkedTech[categoryCheck][value]
            }
        });
    };

    return techList && (
        <Fade in>
            <div className={styles.techPickerWrapper}>

                <div className={styles.techPickerTitle}>
                    {
                        !urlUserID ? 'Selecciona las tecnologías que que manejes.'
                            : `Tecnologías manejadas por ${user.name}.`
                    }
                </div>




                <Grid container>
                    <Grid item xs={12} md={4}>
                        <TechBox
                            title='Web (básicas)'
                            category='web'
                            subCategory='basic'
                            tech={techList.web.basic}
                            icon={<FaHtml5 />}
                            handle={handleCheck}
                        />

                        <TechBox
                            title='Front End'
                            category='web'
                            subCategory='frontEnd'
                            tech={techList.web.frontEnd}
                            icon={<FaJs />}
                            handle={handleCheck}
                        />

                        <TechBox
                            title='Back end'
                            category='web'
                            subCategory='backEnd'
                            tech={techList.web.backEnd}
                            icon={<FaPhp />}
                            handle={handleCheck}
                        />
                    </Grid>




                    <Grid item xs={12} md={4}>
                        <TechBox
                            title='Frameworks frontEnd'
                            category='web'
                            subCategory='frontEndFrameworks'
                            tech={techList.web.frontEndFrameworks}
                            icon={<FaReact />}
                            handle={handleCheck}
                        />

                        <TechBox
                            title='Frameworks back end'
                            category='web'
                            subCategory='backEndFrameworks'
                            tech={techList.web.backEndFrameworks}
                            icon={<FaLaravel />}
                            handle={handleCheck}
                        />
                    </Grid>


                    <Grid item xs={12} md={4}>
                        <TechBox
                            title='Propósito general'
                            category='generalPurpose'
                            tech={techList.generalPurpose}
                            icon={<IoIosBrowsers />}
                            handle={handleCheck}
                        />

                        <TechBox
                            title='Other'
                            category='web'
                            subCategory='other'
                            tech={techList.web.other}
                            icon={<FaGithubSquare />}
                            handle={handleCheck}
                        />
                    </Grid>
                </Grid>
            </div>
        </Fade>
    );
}

export default TechPicker;