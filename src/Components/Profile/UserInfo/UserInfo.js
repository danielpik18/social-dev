import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import styles from './UserInfo.module.scss';
import { TiEdit } from 'react-icons/ti';

const UserInfo = ({ user }) => {
    const infoFields = [
        {
            name: 'Nombre completo',
            value: `${user.name} ${user.lastname}`
        },
        {
            name: 'Correo electrónico',
            value: user.email
        },
        {
            name: 'Rol',
            value: user.role
        }
    ]

    return (
        <div className={styles.infoWrapper}>
            <div className={styles.infoTitle}>
                <TiEdit className={styles.infoTitleIcon} />
                <Typography variant='h6'>
                    Informacion de mi cuenta:
                </Typography>
            </div>

            <Divider style={{ margin: '1rem 0' }} />

            <div className={styles.infoFieldsWrapper}>
                {
                    infoFields.map(field => (
                        <div className={styles.infoField} key={field.name}>
                            <span>
                                {`${field.name}:`}
                            </span>
                            <span style={{ color: 'grey' }}>
                                <small>{field.value}</small>
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default UserInfo;