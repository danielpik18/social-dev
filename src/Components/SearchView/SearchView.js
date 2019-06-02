import React, { useState, useEffect, useContext } from 'react';
import styles from './SearchView.module.scss';
import { Typography, Container, Divider, Slide } from '@material-ui/core';

import { reBase } from './../../firebase';
import SearchResult from './SearchResult/SearchResult';
import { AuthContext } from './../../Contexts/AuthContext';
import { SearchViewContext } from './SearchViewContext';
import { getAllObjectChildrenValues } from '../../utils/misc';
import ReactLoading from 'react-loading';

const SearchView = (props) => {
    const { currentUser } = useContext(AuthContext);
    const {
        searchResults,
        setSearchResults
    } = useContext(SearchViewContext);

    useEffect(() => {
        reBase.fetch('users', {})
            .then(users => {
                //1. Get users drom DB and transform into an object including the ID
                let usersWithID = [];
                let usersByTech;
                let usersByExperience;

                const usersIDs = Object.keys(users);

                usersIDs.forEach((id, i) => {
                    if (currentUser && currentUser.uid !== id) {
                        usersWithID.push({
                            id: usersIDs[i],
                            ...users[id]
                        });
                    }
                });

                //2. Filter users (if filter params are passed)
                if (props.match && props.match.params) {
                    const paramsKeys = Object.keys(props.match.params);

                    paramsKeys.forEach(key => {

                        if (key === 'techTags') {
                            const paramTechTags = props.match.params[key];

                            if (paramTechTags && paramTechTags !== 'null') {
                                usersByTech = [];
                                const filterTechTags = paramTechTags.split(',');

                                usersWithID.forEach(user => {
                                    if (user.tech) {
                                        const userTech = getAllObjectChildrenValues(user.tech);
                                        let filteredUser;

                                        filterTechTags.forEach(tag => {
                                            if (userTech.includes(tag)) {
                                                filteredUser = user;
                                            }
                                        });

                                        filteredUser && usersByTech.push(filteredUser);
                                    }
                                })
                            }
                        }

                        if (key === 'yearsOfExperience') {
                            if (props.match.params) {
                                if (props.match.params[key]) {
                                    usersByExperience = [];

                                    const users = (
                                        (usersByTech && usersByTech.length > 0)
                                            ? usersByTech
                                            : usersWithID
                                    );

                                    users.forEach(user => {
                                        if (user.totalExperienceYears) {

                                            const userTotalExpYears = user.totalExperienceYears;
                                            const minYear = props.match.params[key].split('-')[0];
                                            const maxYear = props.match.params[key].split('-')[1];

                                            if (userTotalExpYears >= minYear && userTotalExpYears <= maxYear) {
                                                usersByExperience.push(user);
                                            }
                                        }
                                    })
                                }
                            }
                        }
                    });
                }

                let fullyFilteredUsers = [];

                //3. Update search results
                if (usersByExperience && usersByTech) {
                    //console.log('PARAMS PASSED: usersByExperience usersByTech');

                    if (usersByExperience.length > 0 && usersByTech.length > 0) {
                        fullyFilteredUsers = usersByExperience;
                    }
                }
                else if (usersByExperience) {
                    //console.log('PARAMS PASSED: usersByExperience');
                    if (usersByExperience.length > 0) {
                        fullyFilteredUsers = usersByExperience;
                    }
                }
                else if (usersByTech) {
                    //console.log('PARAMS PASSED: usersByTech');
                    if (usersByTech.length > 0) {
                        fullyFilteredUsers = usersByTech;
                    }
                }
                else {
                    fullyFilteredUsers = usersWithID
                }

                //4. Set search results after all calculation
                setSearchResults(fullyFilteredUsers);
            });
    }, [props.match]);


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

                                        if (currentUser) {
                                            if (currentUser.uid !== user.id) {
                                                return resultJSX;
                                            }
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