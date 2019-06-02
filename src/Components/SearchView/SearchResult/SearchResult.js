import React from 'react';
import styles from './SearchResult.module.scss';
import { Typography, Slide } from '@material-ui/core';
import StarRatings from 'react-star-ratings';
import cssColors from './../../../scss/_colors.scss';

import { Link } from 'react-router-dom';
import TechTags from '../../TechTags/TechTags';

const SearchResult = ({ user, slideTimeout }) => {
    return (
        <Link
            to={`/profile/${user.id}`}
            style={{
                textDecoration: 'none'
            }}
        >
            <Slide
                in={Boolean(user)}
                direction='up'
                timeout={slideTimeout}
            >
                <div className={styles.resultWrapper}>
                    <div style={{ display: 'flex' }}>
                        <div
                            className={styles.userImage}
                            style={{
                                backgroundImage: (
                                    user.profileImageURL
                                        ? `url(${user.profileImageURL})`
                                        : `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYm-KcyvHy3PDkmh0V9KzkUk26255h0RwthshiaoanTnfH2B_IRg')`
                                )
                            }}
                        >
                        </div>

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

                            <TechTags
                                disabled
                                tech={user.tech}
                                limit={6}
                            />
                        </div>
                    </div>

                    <div className={styles.rightSide}>
                        <div className={styles.rightSideInfo}>
                            <small className={styles.rightSideSubtitle}>
                                Años totales de experiencia:
                    </small>
                            <span className={styles.rightSideValue}>
                                {user.totalExperienceYears ? user.totalExperienceYears : '--'}
                            </span>
                        </div>

                        <div className={styles.rightSideInfo}>
                            <small className={styles.rightSideSubtitle}>
                                ¿Actualmente trabajando?
                    </small>
                            <span className={styles.rightSideValue}>
                                {user.isWorking ? (user.isWorking === 'no' ? 'No' : 'Si') : '--'}
                            </span>
                        </div>
                    </div>
                </div>
            </Slide>
        </Link>
    );
}

export default SearchResult;