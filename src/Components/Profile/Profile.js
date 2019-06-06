import React, { useEffect, useContext } from 'react';
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
    const { user, setUser, urlUserId, setUrlUserID } = useContext(ProfileContext);

    const IdParamOnUrl = props.match.params.id;

    useEffect(() => {
        /* eslint-disable */
        let userID;

        if (IdParamOnUrl) {
            userID = IdParamOnUrl;
            setUrlUserID(IdParamOnUrl);
        }
        else {
            userID = currentUser && currentUser.uid;
            setUrlUserID(null);
        }

        const bindRef = reBase.bindToState(`users/${userID}`, {
            context: {
                setState: ({ user }) => setUser({ ...user }),
                state: { user }
            },
            state: 'user'
        });

        return () => {
            reBase.removeBinding(bindRef);
        }
    }, [IdParamOnUrl]);

    useEffect(() => {
        //console.log(urlUserId);
    }, [urlUserId]);


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