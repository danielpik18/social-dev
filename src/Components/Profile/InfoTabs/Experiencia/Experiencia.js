import React, { useContext, useState } from 'react';
import styles from './Experiencia.module.scss';
import AddItemButton from './../../../AddItemButton/AddItemButton';
import { ProfileContext } from '../../ProfileContext';
import { Dialog } from '@material-ui/core';
import AddExpDialog from './AddExpDialog/AddExpDialog';

const Experiencia = () => {
    const { user } = useContext(ProfileContext);
    const [addExpDialogOpen, setAddExpDialogOpen] = useState(false);

    return (
        <div className={styles.wrapper}>
            {
                user.experience &&
                Object.values(user.experience).map((exp, index) => {
                    const startDate = new Date(exp.startDate);
                    const endDate = (
                        exp.endDate != 'present'
                            ? new Date(exp.endDate)
                            : new Date()
                    );

                    return (
                        <div className={styles.expWrapper} key={index}>
                            <div
                                className={styles.expImage}
                                style={{
                                    backgroundImage: `url(${exp.enterpriseImageURL})`
                                }}
                            >

                            </div>
                            <div className={styles.expInfo}>
                                <div><b>{exp.jobTitle}</b>, {`en ${exp.enterpriseName}`}</div>
                                <div>
                                    <small>
                                        {`
                                    Desde ${startDate.getFullYear() + 1}, 
                                    hasta ${endDate.getFullYear() + 1}, 
                                    `}
                                        <span className={styles.expLocation}>
                                            {exp.location}
                                        </span>
                                    </small>
                                </div>
                            </div>
                        </div>
                    );
                })}

            <AddItemButton
                text='Añadir experiencia laboral'
                clicked={() => setAddExpDialogOpen(true)}
            />

            <AddExpDialog
                isOpen={addExpDialogOpen}
                toggle={setAddExpDialogOpen}
            />
        </div>
    );
}

export default Experiencia;