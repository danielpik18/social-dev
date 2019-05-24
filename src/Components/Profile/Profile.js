import React, { Component } from 'react';
import styles from './Profile.module.scss';
import { Typography, Container } from '@material-ui/core';
import Rating from 'react-rating';

class Profile extends Component {
    state = {
        userRole: 'dev'
    }
    render() {
        return (
            <Container maxWidth='md' className={styles.profileWrapper}>
                <div className={styles.userInfo}>
                    <div className={styles.userImage}>
                    </div>
                    <div className={styles.userInfoTitle}>
                        <div>
                            <Typography variant='h6' color='textSecondary'>
                                Perfíl de:
                            </Typography>
                            <Typography variant='h2' className={styles.userName}>
                                Danielpik18
                            </Typography>
                        </div>
                    </div>
                    <div className={styles.userRating}>
                        <Rating />
                    </div>
                </div>
            </Container>
        );
    }
}

export default Profile;