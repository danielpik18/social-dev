import React, { useContext } from 'react';
import styles from './SavedDevs.module.scss';
import { AuthContext } from './../../../../Contexts/AuthContext';
import SearchResult from './../../../SearchView/SearchResult/SearchResult';
import { getArrayfromObjectWithKeysAsID } from './../../../../utils/misc';

const SavedDevs = () => {
    const { currentUserData } = useContext(AuthContext);
    let savedDevsWithID = [];

    if (
        currentUserData &&
        currentUserData.favoriteDevs &&
        (Object.values(currentUserData.favoriteDevs).length > 0)
    ) {
        savedDevsWithID = getArrayfromObjectWithKeysAsID(currentUserData.favoriteDevs);
    }

    console.log(savedDevsWithID);

    return (
        <div>
            <div className={styles.savedDevsTitle}>
                Desarrolladores favoritos
            </div>

            <div className={styles.savedDevsList}>
                {
                    (savedDevsWithID.length > 0) ?
                        (
                            savedDevsWithID.map((dev, index) => (
                                <SearchResult
                                    key={dev.id}
                                    user={dev}
                                    slideTimeout={index * 350}
                                    smallVersion={true}
                                />
                            ))
                        ) : (
                            <div className={styles.noSavedDevs}>
                                No has agregado desarrolladores
                            </div>
                        )
                }
            </div>
        </div>
    );
}

export default SavedDevs;