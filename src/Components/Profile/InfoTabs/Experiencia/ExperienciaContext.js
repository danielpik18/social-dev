import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../../Contexts/AuthContext';
import { reBase } from '../../../../firebase';

const ExperienciaContext = React.createContext();

const ExperienciaProvider = (props) => {
    const { currentUser } = useContext(AuthContext);

    const [addExpDialogOpen, setAddExpDialogOpen] = useState(false);

    const calculateTotalExperienceYears = () => {
        reBase.fetch(`users/${currentUser.uid}/experience`, {})
            .then(userExp => {
                if (userExp) {
                    let expYearsCount = 0;

                    Object.values(userExp).forEach(experience => {
                        const jobStartDate = new Date(experience.startDate);
                        const jobEndDate = (
                            (experience.endDate !== 'present')
                                ? new Date(experience.endDate)
                                : new Date()
                        );

                        expYearsCount += (jobEndDate.getFullYear() - jobStartDate.getFullYear());

                    });

                    reBase.post(`users/${currentUser.uid}/totalExperienceYears`, {
                        data: expYearsCount
                    });
                }
            })
    }

    return (
        <ExperienciaContext.Provider
            value={{
                addExpDialogOpen,
                setAddExpDialogOpen,
                calculateTotalExperienceYears
            }}
        >
            {props.children}
        </ExperienciaContext.Provider>
    )
};

export {
    ExperienciaContext,
    ExperienciaProvider
}