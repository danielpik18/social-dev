import React from 'react';
import styles from './SearchResult.module.scss';
import { Typography } from '@material-ui/core';

const SearchResult = ({ user }) => {
    return (
        <div className={styles.resultWrapper}>
            <div className={styles.userImage}></div>

            <div className={styles.userInfo}>
                <Typography variant='subtitle1'>
                    {`${user.name} ${user.lastname}`}
                </Typography>

                <Typography variant='subtitle2'>
                    {user.id}
                </Typography>
            </div>
        </div>
    );
}

export default SearchResult;