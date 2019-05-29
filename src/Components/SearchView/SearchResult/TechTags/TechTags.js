import React from 'react';
import styles from './TechTags.module.scss';

const TechTags = ({ tags }) => {
    return (
        <div className={styles.tags}>
            {
                tags &&
                tags.map(tag => (
                    <div
                        key={tag}
                        className={styles.tag}
                    >
                        {tag}
                    </div>
                ))
            }
        </div>
    );
}

export default TechTags;