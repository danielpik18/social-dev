import React, { useState, useEffect, useContext } from 'react';
import styles from './Profile.module.scss';
import { Container, Divider } from '@material-ui/core';
import UserHeader from './UserHeader/UserHeader';
import UserInfo from './UserInfo/UserInfo';
import InfoTabs from './InfoTabs/InfoTabs';

import { AuthContext } from './../../Contexts/AuthContext';

import { ProfileContext } from './ProfileContext';

import { reBase } from './../../firebase';

const Profile = (props) => {
    const { currentUser } = useContext(AuthContext);
    const { user, setUser, setUrlUserID } = useContext(ProfileContext);

    const profileUrlId = props.match.params.id;

    useEffect(() => {
        let userID;

        if (profileUrlId) {
            userID = profileUrlId;
            setUrlUserID(profileUrlId)
        }
        else {
            setUrlUserID(null)
            userID = currentUser && currentUser.uid;
        }

        //Fetch user's data
        reBase.syncState(`users/${userID}`, {
            context: {
                setState: ({ user }) => setUser({ ...user }),
                state: { user }
            },
            state: 'user'
        })
    }, [])


    return user && (
        <Container maxWidth='md' className={styles.profileWrapper}>
            <UserHeader />
            <UserInfo />
            <InfoTabs />
        </Container>
    );
}

export default Profile;