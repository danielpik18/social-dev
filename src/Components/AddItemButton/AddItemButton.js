import React from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import styles from './AddItemButton.module.scss';
import { Button } from '@material-ui/core';

const AddItemButton = ({ text }) => {
    return (
        <Button className={styles.button}>
            <IoIosAddCircle className={styles.addIcon} />
            <div>
                {text}
            </div>
        </Button>
    );
}

export default AddItemButton;