import React from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import styles from './AddItemButton.module.scss';
import { Button } from '@material-ui/core';

const AddItemButton = ({ clicked, text }) => {
    return (
        <Button
            onClick={clicked}
            className={styles.button}
            fullWidth
        >
            <IoIosAddCircle className={styles.addIcon} />
            <div>
                {text}
            </div>
        </Button>
    );
}

export default AddItemButton;