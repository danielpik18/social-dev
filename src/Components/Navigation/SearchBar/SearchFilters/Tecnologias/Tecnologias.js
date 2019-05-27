import React, { Component } from 'react';
import styles from './Tecnologias.module.scss';
import { Grid, Typography, Checkbox, Divider } from '@material-ui/core';

class Tecnologias extends Component {
    state = {
        selectedTech: {
            frontEnd: [],
            backEnd: [],
            other: []
        }
    }

    toggleCheck = (category, techName) => {
        const selectedTech = { ...this.state.selectedTech };

        if (selectedTech[category].includes(techName)) {
            const techIndex = selectedTech[category].indexOf(techName);
            selectedTech[category].splice(techIndex, 1);
        }
        else {
            selectedTech[category].push(techName);
        }

        this.setState({ selectedTech });
    }

    frontEndTech = []

    render() {
        console.log(this.state);

        const techs = {
            frontEnd: ['React JS', 'Angular JS', 'Vue JS', 'Jquery'],
            backEnd: ['PHP', 'Node JS', 'Java', 'Python'],
            other: ['Git', 'Github', 'Docker', 'AWS']
        };

        return (
            <div className={styles.techWrapper}>
                <Grid container>
                    <Grid item xs={4}>
                        <div className={styles.techList}>
                            <Typography variant='caption'>Front end</Typography>

                            <Divider style={{ margin: '.4rem 1rem' }} />

                            {
                                techs.frontEnd.map(tech => (
                                    <div
                                        key={tech}
                                        className={styles.techItem}
                                    >
                                        <Typography variant='caption'>
                                            {tech}
                                        </Typography>

                                        <Checkbox
                                            checked={this.state.selectedTech.frontEnd.includes(tech)}
                                            onChange={() => this.toggleCheck('frontEnd', tech)}
                                            value={tech}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={styles.backEnd}>
                            <Typography variant='caption'>Back end</Typography>

                            <Divider style={{ margin: '.4rem 1rem' }} />

                            {
                                techs.backEnd.map(tech => (
                                    <div
                                        key={tech}
                                        className={styles.techItem}
                                    >
                                        <Typography variant='caption'>
                                            {tech}
                                        </Typography>

                                        <Checkbox
                                            checked={this.state.selectedTech.backEnd.includes(tech)}
                                            onChange={() => this.toggleCheck('backEnd', tech)}
                                            value={tech}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={styles.other}>
                            <Typography variant='caption'>Otras tecnologías</Typography>

                            <Divider style={{ margin: '.4rem 1rem' }} />

                            {
                                techs.other.map(tech => (
                                    <div
                                        key={tech}
                                        className={styles.techItem}
                                    >
                                        <Typography variant='caption'>
                                            {tech}
                                        </Typography>

                                        <Checkbox
                                            checked={this.state.selectedTech.other.includes(tech)}
                                            onChange={() => this.toggleCheck('other', tech)}
                                            value={tech}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Tecnologias;