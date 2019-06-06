import React, { useContext, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import cssColors from './../../../../scss/_colors.scss';
import { Typography } from '@material-ui/core';
import styles from './UserRatings.module.scss';
import { reBase } from './../../../../firebase';
import { AuthContext } from '../../../../Contexts/AuthContext';
import { ProfileContext } from '../../ProfileContext';


const UserRatings = () => {
    const { currentUser } = useContext(AuthContext);
    const { user, urlUserID } = useContext(ProfileContext);
    const ratings = user.ratings && Object.values(user.ratings);
    const ratingEnabled = urlUserID ? true : false;

    const ratingsCount = user.ratings ?
        ratings.length : 0;

    useEffect(() => {
        if ((user && user.ratings) && urlUserID) {
            const ratings = Object.values(user.ratings);
            let ratio = 0.0;

            if (ratings && ratings.length > 0) {
                const ratingsSum = ratings.reduce((a, b) => a + b);

                ratio = ratingsSum / ratings.length;
            }
            else if (ratings && ratings.length === 0) {
                ratio = ratings[0];
            }

            reBase.post(`users/${urlUserID}/ratingRatio`, {
                data: ratio
            });
        }
    }, [user.ratings]);

    const addRating = (newRating) => {
        const userDoingRatingID = (
            currentUser ?
                currentUser.uid
                : null
        );

        const userBeingRatedUserID = urlUserID;

        if (userDoingRatingID) {

            reBase.post(`users/${userBeingRatedUserID}/ratings/${userDoingRatingID}`, {
                data: newRating,
                then: (error) => {
                    if (error) alert(error)
                    else {
                        alert('rateds')
                    }
                }
            });
        }
        else {
            alert('sign in to rate an user');
        }
    };

    return (
        <div className={styles.rating}>
            <div>
                <span className={styles.ratingRatio}>
                    {user.ratingRatio ? user.ratingRatio.toFixed(2) : (0).toFixed(2)}
                </span>

                <StarRatings
                    rating={user.ratingRatio}
                    changeRating={rating => addRating(rating)}
                    numOfStars={5}
                    name='rating'
                    starWidthAndHeight='1.2rem'
                    starSpacing='0px'
                    starRatedColor={cssColors.yellowLight}
                    starEmptyColor={cssColors.greyLight}
                    starSelectingHoverColor={cssColors.redLight}
                    isSelectable={ratingEnabled}
                />
            </div>

            <Typography
                variant='caption'
                className={styles.ratingVotes}
            >
                {`(${ratingsCount} votos)`}
            </Typography>
        </div>
    );
}

export default UserRatings;