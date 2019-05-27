import React, { Component } from 'react';
import styles from './Profile.module.scss';
import { Container, Divider } from '@material-ui/core';
import UserHeader from './UserHeader/UserHeader';
import UserInfo from './UserInfo/UserInfo';
import InfoTabs from './InfoTabs/InfoTabs';

import { reBase } from './../../firebase';

class Profile extends Component {
    state = {
        user: null,
        ratingsEnabled: false
    }


    addRating = (newRating) => {
        const userDoingRatingID = this.props.authContext.currentUser.uid
        const userBeingRatedUserID = this.props.match.params.id;

        if (this.props.authContext) {
            reBase.post(`users/${userBeingRatedUserID}/ratings/${userDoingRatingID}`, {
                data: newRating,
                then: (error) => {
                    if (error) alert(error)
                    else alert('rating saved')
                }
            });
        }
        else {
            alert('sign in to rate an user');
        }
    };

    componentWillMount() {
        let userID;

        if (this.props.match.params.id) {
            userID = this.props.match.params.id;
            this.setState({ ratingsEnabled: true })
        }
        else {
            userID = this.props.authContext.currentUser.uid;
        }

        //Sync logged in user's data with state
        reBase.syncState(`users/${userID}`, {
            context: this,
            state: 'user'
        });
    };

    render() {
        let ratingRatio = 0;
        if (this.state.user) {
            if (this.state.user.ratings) {
                const ratingsArr = Object.values(this.state.user.ratings);
                const ratingsSum = ratingsArr.reduce((a, b) => a + b);

                ratingRatio = ratingsSum / ratingsArr.length;
            }
        }

        return (
            this.state.user &&
            <Container maxWidth='md' className={styles.profileWrapper}>
                <UserHeader
                    user={this.state.user}
                    ratingsEnabled={this.state.ratingsEnabled}
                    addRating={this.addRating}
                    ratingRatio={ratingRatio}
                />

                <Divider />

                <UserInfo user={this.state.user} />

                <InfoTabs />
            </Container>
        );
    }
}

export default Profile;