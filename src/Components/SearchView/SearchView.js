import React, { Component } from 'react';
import styles from './SearchView.module.scss';
import { Typography, Container, Divider } from '@material-ui/core';

import { reBase } from './../../firebase';
import SearchResult from './SearchResult/SearchResult';

class SearchView extends Component {
    state = {
        searchResults: []
    }

    componentWillMount() {
        reBase.fetch('users', {
            context: this
        }).then(data => {
            let users = [];

            const usersIDs = Object.keys(data);

            usersIDs.forEach((key, i) => {
                users.push({
                    id: usersIDs[i],
                    ...data[key]
                });
            });

            this.setState({ searchResults: users })
        });
    }

    render() {
        console.log(this.props.match.params.id)

        return (
            <Container maxWidth='md' className={styles.searchWrapper}>
                <Typography variant='h4'>
                    Resultados:
                </Typography>

                <Divider style={{ margin: '1rem 0' }} />

                <div className={styles.searchResults}>
                    {
                        this.state.searchResults.map((result, index) => {
                            return (
                                <SearchResult
                                    user={result}
                                    key={index}
                                />
                            )
                        })
                    }
                </div>
            </Container>
        );
    }
}

export default SearchView;