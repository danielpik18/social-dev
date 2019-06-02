import React, { useState, useEffect, useContext } from 'react';
import styles from './Profile.module.scss';
import { Container } from '@material-ui/core';
import ReactLoading from 'react-loading';
import UserHeader from './UserHeader/UserHeader';
import UserInfo from './UserInfo/UserInfo';
import InfoTabs from './InfoTabs/InfoTabs';

import { AuthContext } from './../../Contexts/AuthContext';

import { ProfileContext } from './ProfileContext';

import { reBase } from './../../firebase';
import { UserInfoProvider } from './UserInfo/UserInfoContext';

const Profile = (props) => {
    const { currentUser } = useContext(AuthContext);
    const { user, setUser, setUrlUserID } = useContext(ProfileContext);

    const profileUrlId = props.match.params.id;

    useEffect(() => {
        let userID;

        if (profileUrlId) {
            userID = profileUrlId;
            setUrlUserID(profileUrlId);
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
    }, [props.match])


    return !user ?
        (
            <ReactLoading
                type='spin'
                color="grey"
                className={styles.loader}
            />
        )
        : (
            <Container maxWidth='md' className={styles.profileWrapper}>
                <UserHeader />

                <UserInfoProvider>
                    <UserInfo />
                </UserInfoProvider>

                <InfoTabs />
            </Container>
        );
}

export default Profile;