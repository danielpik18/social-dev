import React, { useContext, useEffect } from 'react';
import styles from './Handle.module.scss';
import { SearchFiltersContext } from '../../SearchFiltersContext';

const Handle = ({
    handle: { id, value, percent },
    getHandleProps
}) => {
    const {
        setExpYearsMin,
        setExpYearsMax
    } = useContext(SearchFiltersContext);

    const clicked = (
        id === '$$-0'
            ? setExpYearsMin
            : setExpYearsMax
    );

    return (
        <div
            className={styles.handle}
            style={{
                left: `${percent}%`
            }}
            onMouseUp={() => clicked(value)}
            {...getHandleProps(id)}
        >
            <div
                className={styles.handleValue}

            >
                {value}
            </div>
        </div >
    )
};

export default Handle;