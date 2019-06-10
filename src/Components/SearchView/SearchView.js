import React, { useEffect, useContext, useState } from 'react';
import styles from './SearchView.module.scss';
import { Container } from '@material-ui/core';

import { reBase } from './../../firebase';
import SearchResult from './SearchResult/SearchResult';
import { AuthContext } from './../../Contexts/AuthContext';
import { SearchViewContext } from './SearchViewContext';
import { getAllObjectChildrenValues } from '../../utils/misc';
import ReactLoading from 'react-loading';
import { SearchFiltersContext } from '../Navigation/SearchBar/SearchFilters/SearchFiltersContext';

const SearchView = (props) => {
    const { currentUser } = useContext(AuthContext);
    const {
        searchResults,
        setSearchResults
    } = useContext(SearchViewContext);

    const { devName } = useContext(SearchFiltersContext);

    useEffect(() => {
        reBase.fetch('users', {})
            .then(users => {
                const usersIDs = Object.keys(users);

                //1. Get users drom DB and transform into an object including the ID
                let usersWithID = [];

                usersIDs.forEach((id, i) => {
                    if (
                        (currentUser && currentUser.uid !== id) &&
                        (users[id].role !== 'Reclutador')
                    ) {
                        usersWithID.push({
                            id: usersIDs[i],
                            ...users[id]
                        });
                    }
                });

                //2. Filter users (if filter params are passed)
                if (devName) {
                    usersWithID = usersWithID.filter(user => {
                        const devNameSplit = devName.split(' ');
                        const userFullNameSplit = `${user.name} ${user.lastname}`
                            .toLowerCase()
                            .split(' ');

                        let filteredUser;



                        devNameSplit.forEach(word => {
                            const lowercasedWord = word.toLowerCase();

                            if (userFullNameSplit.includes(lowercasedWord)) {
                                console.log(userFullNameSplit);

                                filteredUser = user;
                            }
                        });

                        return filteredUser;
                    });
                }
                else {
                    if (props.match && props.match.params) {
                        const paramsKeys = Object.keys(props.match.params);

                        paramsKeys.forEach(key => {

                            if (key === 'techTags') {
                                if (props.match.params[key] &&
                                    props.match.params[key] !== 'null') {
                                    const filterTechTags = props.match.params[key].split(',');

                                    usersWithID = usersWithID.filter(user => {
                                        if (user.tech) {
                                            const userTech = getAllObjectChildrenValues(user.tech);
                                            let filteredUser;

                                            filterTechTags.forEach(tag => {
                                                if (userTech.includes(tag)) {
                                                    filteredUser = user;
                                                }
                                            });

                                            return filteredUser;
                                        }
                                    });
                                }
                            }

                            else if (key === 'yearsOfExperience') {
                                if (
                                    props.match.params[key] &&
                                    props.match.params[key] !== 'null'
                                ) {
                                    usersWithID = usersWithID.filter(user => {
                                        const minYear = props.match.params[key].split('-')[0];
                                        const maxYear = props.match.params[key].split('-')[1];

                                        let filteredUser;

                                        if (
                                            (user.totalExperienceYears &&
                                                (user.totalExperienceYears >= minYear &&
                                                    user.totalExperienceYears <= maxYear))
                                            || minYear == 0) {
                                            filteredUser = user;
                                        }

                                        return filteredUser;
                                    });
                                }
                            }

                            else if (key === 'minRating') {
                                if (
                                    props.match.params[key] &&
                                    props.match.params[key] !== 'null'
                                ) {
                                    usersWithID = usersWithID.filter(user => {
                                        const minRating = props.match.params[key];
                                        let filteredUser;

                                        if (user.ratingRatio &&
                                            user.ratingRatio >= minRating
                                        ) {
                                            filteredUser = user;
                                        }

                                        return filteredUser;
                                    });
                                }
                            }
                        });
                    }
                }

                //3. Set search results after all calculation
                setSearchResults(usersWithID);
            });
    }, [props.match, currentUser, setSearchResults]);



    return (
        <Container maxWidth='md' className={styles.searchWrapper}>
            <span className={styles.searchResultsTitle}>
                RESULTADOS DE LA BUSQUEDA:
            </span>

            <div className={styles.searchResults}>
                {
                    !searchResults ?
                        (
                            <ReactLoading
                                type='spin'
                                color="grey"
                                className={styles.loader}
                            />

                        )
                        : (
                            searchResults.length > 0
                                ? (
                                    searchResults.map((user, index) => {

                                        const resultJSX = (
                                            <SearchResult
                                                user={user}
                                                key={user.id}
                                                slideTimeout={index * 350}
                                            />
                                        );

                                        if (currentUser && (currentUser.uid !== user.id)) {
                                            return resultJSX;
                                        }
                                        else if (searchResults.length === 1) {
                                            return (
                                                <div key={user.id}>
                                                    No se encontraron coincidencias.
                                                </div>
                                            );
                                        }
                                        else return resultJSX;
                                    })
                                )
                                : (
                                    <div>
                                        No se encontraron coincidencias.
                                    </div>
                                )
                        )
                }
            </div>
        </Container>
    );
}

export default SearchView;