import React, { useContext } from 'react';
import styles from './SavedDevs.module.scss';
import { AuthContext } from './../../../../Contexts/AuthContext';
import SearchResult from './../../../SearchView/SearchResult/SearchResult';

const SavedDevs = () => {
    const { currentUserData } = useContext(AuthContext);
    const savedDevsWithID = [];

    if (currentUserData) {
        if (currentUserData.favoriteDevs && (Object.values(currentUserData.favoriteDevs).length > 0)) {
            const favoriteDevsKeys = Object.keys(currentUserData.favoriteDevs);

            favoriteDevsKeys.forEach(devID => {
                savedDevsWithID.push({
                    ...currentUserData.favoriteDevs[devID],
                    id: devID
                });
            });
        }
    }

    console.log(savedDevsWithID);

    return (
        <div>
            <div className={styles.savedDevsTitle}>
                Desarrolladores favoritos
            </div>

            <div className={styles.savedDevsList}>
                {
                    savedDevsWithID.map((dev, index) => (
                        <SearchResult
                            user={dev}
                            slideTimeout={index * 350}
                            smallVersion={true}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default SavedDevs;