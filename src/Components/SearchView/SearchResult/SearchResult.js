import React from 'react';
import styles from './SearchResult.module.scss';
import { Typography } from '@material-ui/core';
import StarRatings from 'react-star-ratings';
import cssColors from './../../../scss/_colors.scss';
import TechTags from './TechTags/TechTags';

import { Link } from 'react-router-dom';

const SearchResult = ({ user }) => {
    return (
        <Link
            to={`/profile${user.id}`}
            style={{
                textDecoration: 'none'
            }}
        >
            <div className={styles.resultWrapper}>
                <div style={{ display: 'flex' }}>
                    <div className={styles.userImage}></div>

                    <div className={styles.userInfo}>
                        <Typography
                            variant='subtitle1'
                            className={styles.userName}
                        >
                            {`${user.name} ${user.lastname}`}
                        </Typography>

                        <StarRatings
                            rating={user.ratingRatio}
                            numOfStars={5}
                            starWidthAndHeight='1.2rem'
                            starSpacing='0px'
                            starRatedColor={cssColors.yellowLight}
                            starEmptyColor={cssColors.grey}
                            isSelectable={false}
                        />

                        <TechTags tags={user.tech} />
                    </div>
                </div>

                <div className={styles.rightSide}>
                    <div className={styles.rightSideInfo}>
                        <small className={styles.rightSideSubtitle}>
                            Disponibilidad:
                    </small>
                        <span className={styles.rightSideValue}>
                            {user.availability ? user.availability : '--'}
                        </span>
                    </div>

                    <div className={styles.rightSideInfo}>
                        <small className={styles.rightSideSubtitle}>
                            Proyectos públicos:
                    </small>
                        <span className={styles.rightSideValue}>
                            {user.projects ? user.projects.length : '--'}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default SearchResult;