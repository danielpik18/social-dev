import React from 'react';
import styles from './Experiencia.module.scss';
import AddItemButton from './../../../AddItemButton/AddItemButton';

const Experiencia = () => {
    const jobExps = [
        {
            jobTitle: 'Desarrollador Full-stack',
            startDate: new Date('2012'),
            endDate: new Date(),
            location: 'Barranquilla, Colombia',
            enterpriseName: 'NativApps',
            enterpriseImage: 'https://media.licdn.com/dms/image/C4D0BAQFgpu8qjjCakQ/company-logo_200_200/0?e=2159024400&v=beta&t=TbM4ymbthSy-G_Zk0h2D9a7iFFHgj_7FirE0HnInggs'
        },
        {
            jobTitle: 'Dev Ops',
            startDate: new Date('2014'),
            endDate: new Date(),
            location: 'Barranquilla, Colombia',
            enterpriseName: 'Joonik',
            enterpriseImage: 'https://media.licdn.com/dms/image/C560BAQGOQ5YX-CxVYQ/company-logo_200_200/0?e=2159024400&v=beta&t=lLrxWQ7LzeFNgGUUwTiCcr2QT89VMUnO1CtHzB6WlFQ'
        }
    ]

    return (
        <div className={styles.wrapper}>
            {jobExps.map((exp, index) => (
                <div className={styles.expWrapper} key={index}>
                    <div
                        className={styles.expImage}
                        style={{
                            backgroundImage: `url(${exp.enterpriseImage})`
                        }}
                    >

                    </div>
                    <div className={styles.expInfo}>
                        <div><b>{exp.jobTitle}</b>, {exp.enterpriseName}</div>
                        <div>
                            <small>
                                {`
                                Desde ${exp.startDate.getFullYear()}, 
                                hasta ${exp.endDate.getFullYear()}
                                `}
                            </small>
                        </div>
                    </div>
                </div>
            ))}

            <AddItemButton text='Añadir experiencia laboral' />
        </div>
    );
}

export default Experiencia;