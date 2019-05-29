import React, { useContext } from 'react';
import styles from './UserHeader.module.scss';
import { Typography } from '@material-ui/core';
import SocialMediaButtons from './SocialMediaButtons/SocialMediaButtons';

import { AuthContext } from './../../../Contexts/AuthContext';
import UserRatings from './UserRatings/UserRatings';
import { ProfileContext } from '../ProfileContext';

const UserHeader = () => {
    const { user, urlUserID } = useContext(ProfileContext);



    return (
        <div className={styles.userHeader}>
            <div className={styles.userImage}>
            </div>

            <div className={styles.userHeaderTitle}>
                {
                    urlUserID &&
                    <div>
                        <Typography variant='h6' color='textSecondary'>
                            Perfíl de:
                            </Typography>
                        <Typography variant='h3' className={styles.userName}>
                            {`${user.name} ${user.lastname}`}
                        </Typography>
                    </div>
                }
            </div>

            <SocialMediaButtons />

            <UserRatings
                ratings={user.ratings && Object.values(user.ratings)}
            />
        </div>
    );
}

export default UserHeader;