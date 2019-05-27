import React from 'react';
import styles from './UserHeader.module.scss';
import StarRatings from 'react-star-ratings';
import cssColors from './../../../scss/_colors.scss';
import { Typography } from '@material-ui/core';

const UserHeader = ({ user, ratingsEnabled, ratingRatio, addRating }) => {
    return (
        <div className={styles.userHeader}>
            <div className={styles.userImage}>
            </div>
            <div className={styles.userHeaderTitle}>
                <div>
                    <Typography variant='h6' color='textSecondary'>
                        Perfíl de:
                            </Typography>
                    <Typography variant='h2' className={styles.userName}>
                        {`${user.name} ${user.lastname}`}
                    </Typography>
                </div>
            </div>
            <div className={styles.userRating}>
                <div>
                    {
                        ratingRatio &&
                        <>
                            <Typography variant='caption'>
                                {`Puntaje promedio: ${ratingRatio}`}
                            </Typography>

                            <Typography variant='caption'>
                                {`(Calificado ${Object.values(user.ratings).length} veces)`}
                            </Typography>
                        </>
                    }
                </div>

                <StarRatings
                    rating={ratingRatio}
                    changeRating={rating => addRating(rating)}
                    numOfStars={5}
                    name='rating'
                    starWidthAndHeight='1.4rem'
                    starSpacing='0px'
                    starRatedColor={cssColors.yellowLight}
                    starEmptyColor={cssColors.greyLight}
                    starSelectingHoverColor={cssColors.redLight}
                    isSelectable={ratingsEnabled}
                />
            </div>
        </div>
    );
}

export default UserHeader;