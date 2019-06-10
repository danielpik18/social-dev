import React, { useState, useContext } from 'react';
import StarRatings from 'react-star-ratings';
import cssColors from './../../../../../scss/_colors.scss';
import styles from './Rating.module.scss';
import { TextField } from '@material-ui/core';
import { SearchFiltersContext } from '../SearchFiltersContext';

const Rating = () => {
    const { minRating, setMinRating } = useContext(SearchFiltersContext);

    return (
        <div className={styles.starsWrapper}>

            <div className={styles.title}>
                Selecciona el puntaje mínimo del desarrollador.
            </div>

            <StarRatings
                rating={minRating}
                numOfStars={5}
                name='rating'
                starWidthAndHeight='3.6rem'
                starSpacing='0px'
                starRatedColor={cssColors.yellowLight}
                starEmptyColor={cssColors.greyLight}
                isSelectable={false}
            />

            <TextField
                variant='outlined'
                label="Puntaje mínimo"
                style={{
                    width: '6rem',
                    marginTop: '2rem'
                }}
                type='number'
                value={minRating}
                onChange={e => setMinRating(Number.parseFloat(e.currentTarget.value))}

                inputProps={{
                    step: 0.05,
                    max: 5,
                    min: 0
                }}
            />
        </div>
    );
}

export default Rating;