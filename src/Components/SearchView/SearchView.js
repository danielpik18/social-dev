import React, { useState, useEffect, useContext } from 'react';
import styles from './SearchView.module.scss';
import { Typography, Container, Divider } from '@material-ui/core';

import { reBase } from './../../firebase';
import SearchResult from './SearchResult/SearchResult';
import { AuthContext } from './../../Contexts/AuthContext';

const SearchView = () => {
    const [searchResults, setSearchResults] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        reBase.fetch('users', {})
            .then(users => {
                let usersWithID = [];

                const usersIDs = Object.keys(users);

                usersIDs.forEach((key, i) => {
                    usersWithID.push({
                        id: usersIDs[i],
                        ...users[key]
                    });
                });

                setSearchResults(usersWithID);
            });
    }, []);

    return (
        <Container maxWidth='md' className={styles.searchWrapper}>
            <Typography variant='h5'>
                Resultados de la búsqueda:
            </Typography>

            <div className={styles.searchResults}>
                {
                    searchResults.map(user => {
                        const resultJSX = (
                            <SearchResult
                                user={user}
                                key={user.id}
                            />
                        );

                        if (currentUser) {
                            if (user.id !== currentUser.uid) {
                                return resultJSX;
                            }
                        } else {
                            return resultJSX;
                        }
                    })
                }
            </div>
        </Container>
    );
}

export default SearchView;