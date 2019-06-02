import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import styles from './Experiencia.module.scss';

import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';

import Handle from './Handle/Handle';
import Track from './Track/Track';
import { SearchFiltersContext } from './../SearchFiltersContext';

const Experiencia = () => {
    const { expYearsMin, expYearsMax } = useContext(SearchFiltersContext);

    const min = expYearsMin ? expYearsMin : 0;
    const max = expYearsMax ? expYearsMax : 50;

    return (
        <div className={styles.expWrapper}>
            <Typography variant='h6'>
                Años de experiencia
            </Typography>

            <div className={styles.inputBlock}>
                <Slider
                    className={styles.slider}
                    domain={[0, 50]}
                    values={[min, max]}
                    step={1}
                    mode={2}
                >

                    <Rail>
                        {({ getRailProps }) => (  // adding the rail props sets up events on the rail
                            <div className={styles.sliderRail} {...getRailProps()} />
                        )}
                    </Rail>

                    <Handles>
                        {({ handles, getHandleProps }) => (
                            <div className={styles.sliderHandle}>
                                {handles.map(handle => (
                                    <Handle
                                        key={handle.id}
                                        handle={handle}
                                        getHandleProps={getHandleProps}
                                    />
                                ))}
                            </div>
                        )}
                    </Handles>

                    <Tracks left={false} right={false}>
                        {({ tracks, getTrackProps }) => (
                            <div className="slider-tracks">
                                {tracks.map(({ id, source, target }) => (
                                    <Track
                                        key={id}
                                        source={source}
                                        target={target}
                                        getTrackProps={getTrackProps}
                                    />
                                ))}
                            </div>
                        )}
                    </Tracks>
                </Slider>
            </div>
        </div>
    );
}

export default Experiencia;