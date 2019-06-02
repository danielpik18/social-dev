import React, { useEffect, useState, useContext } from 'react';
import styles from './TechTags.module.scss';
import { SearchFiltersContext } from '../Navigation/SearchBar/SearchFilters/SearchFiltersContext';

const TechTags = ({
    tech,
    limit,
    clicked,
    disabled
}) => {
    const { techTags } = useContext(SearchFiltersContext);

    const [tags, setTags] = useState([]);

    useEffect(() => {
        const tagsArr = [];

        if (tech) {
            const techKeys = Object.keys(tech);

            techKeys.forEach(key => {
                const techCategory = Object.values(tech[key]);

                techCategory.forEach(category => {

                    if (Array.isArray(category)) {
                        category.forEach(value => tagsArr.push(value));
                    }
                    else if (typeof category === 'object') {
                        Object.values(category)
                            .forEach(value => tagsArr.push(value))
                    }
                    else {
                        tagsArr.push(category);
                    }
                })
            })
        };

        setTags(tagsArr);
    }, [tech]);

    return (
        <div className={styles.tags}>
            {
                tags.length > 0 &&
                tags.map((tag, index) => {
                    let className;

                    if (disabled) {
                        className = styles.tagDisabled;
                    }
                    else if (techTags && techTags.includes(tag)) {
                        className = styles.tagChecked;
                    } else {
                        className = styles.tagClickable;
                    }

                    return (
                        (limit ? (index < limit) : true) &&

                        <div
                            key={index}
                            className={`${styles.tag} ${className}`}
                            onClick={clicked && (() => clicked(tag))}
                            style={{
                                cursor: 'pointer'
                            }}
                        >
                            {tag}
                        </div>

                    )
                })
            }
        </div>
    );
}

export default TechTags;