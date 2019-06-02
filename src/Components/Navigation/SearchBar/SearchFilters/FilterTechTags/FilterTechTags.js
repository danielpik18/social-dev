import React, { useEffect, useState, useContext } from 'react';
import TechTags from './../../../../TechTags/TechTags';
import { reBase } from './../../../../../firebase';
import ReactLoading from 'react-loading';

import styles from './FilterTechTags.module.scss';
import { SearchFiltersContext } from '../SearchFiltersContext';

const FilterTechTags = () => {
    const { techTags, setTechTags } = useContext(SearchFiltersContext);

    const [techList, setTechList] = useState(null);

    useEffect(() => {
        reBase.fetch('tech', {})
            .then(tech => {
                setTechList(tech);
            })
            .catch(error => console.log(error));
    }, []);

    const handleTagClick = (passedTag) => {
        if (techTags) {
            if (techTags.includes(passedTag)) {
                setTechTags([
                    ...techTags.filter(tag => tag !== passedTag)
                ]);
            }
            else {
                setTechTags([
                    ...techTags,
                    passedTag
                ]);
            }
        } else {
            setTechTags([passedTag]);
        }
    };

    return (
        <div className={styles.techTagsWrapper}>
            {
                !techList
                    ? <ReactLoading
                        type='spin'
                        color="grey"
                        className={styles.loader}
                    />
                    : (
                        <TechTags
                            tech={techList}
                            clicked={handleTagClick}
                        />
                    )
            }
        </div>
    );
}

export default FilterTechTags;