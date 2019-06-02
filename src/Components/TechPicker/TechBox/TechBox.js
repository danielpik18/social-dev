import React, { useContext } from 'react';
import styles from './TechBox.module.scss';
import { Divider } from '@material-ui/core';
import { ProfileContext } from '../../Profile/ProfileContext';

const TechBox = ({ tech, title, category, subCategory, icon, handle }) => {
    const { user, urlUserID } = useContext(ProfileContext);

    return (
        <div
            className={
                `${styles.techCategoryWrapper}
                ${subCategory ?
                    styles[subCategory]
                    : styles[category]}`
            }
        >
            <div className={styles.techCategoryTitle}>
                {icon}
                <span>
                    {title}
                </span>
            </div>

            <Divider />

            <div className={styles.techCategoryList}>
                {
                    tech.map(tech => {
                        let isChecked = false;

                        if(user.tech){
                            if (subCategory) {
                                if (user.tech[category][subCategory]) {
                                    if (Object.values(user.tech[category][subCategory]
                                    ).includes(tech)) isChecked = true;
                                }
                            }
                            else {
                                if (user.tech[category]) {
                                    if (Object.values(user.tech[category])
                                        .includes(tech)) isChecked = true;
                                }
                            }
                        }

                        return (
                            <label
                                style={{
                                    cursor: urlUserID && 'auto'
                                }}
                                className={styles.techCheckWrapper}
                                key={tech}
                            >
                                <input
                                    disabled={urlUserID && true}
                                    name={tech}
                                    type='checkbox'
                                    checked={isChecked}
                                    onChange={(e) => handle(category, subCategory, e.currentTarget.name)}
                                    className={styles.techCheck}
                                />
                                <span>{tech}</span>
                            </label>
                        )
                    })
                }
            </div>

        </div>
    );
}

export default TechBox;