import React from 'react';
import styles from './Track.module.scss';

const Track = ({ source, target, getTrackProps }) => {
    return (
        <div
            className={styles.track}
            style={{
                left: `${source.percent}%`,
                width: `${target.percent - source.percent}%`,
            }}
            {...getTrackProps()} // this will set up events if you want it to be clickeable (optional)
        />
    )
}

export default Track;