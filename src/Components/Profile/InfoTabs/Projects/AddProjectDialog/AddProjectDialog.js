import React, { useState, useContext, useEffect } from 'react';
import styles from './AddProjectDialog.module.scss';
import { Dialog, TextField, InputAdornment, Button } from '@material-ui/core';
import { MdImage } from 'react-icons/md';
import { GoMarkGithub } from 'react-icons/go';
import { IoIosGlobe, IoMdAddCircleOutline } from 'react-icons/io';
import { ProfileContext } from '../../../ProfileContext';
import validUrl from 'valid-url';
import { storage, reBase } from './../../../../../firebase';
import { AuthContext } from '../../../../../Contexts/AuthContext';
import ErrorDialog from '../../../../Dialogs/ErrorDialog/ErrorDialog';

const AddProjectDialog = ({ isOpen, toggle }) => {
    const { currentUser } = useContext(AuthContext);
    const { urlUserID } = useContext(ProfileContext);

    const [errorDialog, setErrorDialog] = useState({
        open: false,
        message: ''
    });

    const [projectImage, setProjectImage] = useState(null);
    const [projectImageInputRef, setProjectImageInputRef] = useState(null);
    const [projectImagePreview, setProjectImagePreview] = useState(null);

    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    const [projectDemoLink, setProjectDemoLink] = useState('');
    const [projectGithubLink, setProjectGithubLink] = useState('');

    const handleAddProject = () => {
        if (
            projectTitle &&
            projectDescription &&
            projectDemoLink &&
            projectImage
        ) {
            if (validUrl.isUri(projectDemoLink)) {
                const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/gif'];

                if (acceptedFileTypes.includes(projectImage.type)) {
                    if (projectImage.size <= 350000) {
                        const uploadTask = storage
                            .ref(`images/${projectImage.name}`)
                            .put(projectImage);

                        uploadTask.on('state_changed',
                            () => {
                            },
                            (error) => {
                                console.log(error);
                            },
                            () => {
                                storage.ref('images')
                                    .child(projectImage.name)
                                    .getDownloadURL()
                                    .then(url => {
                                        reBase.push(`users/${currentUser.uid}/projects`, {
                                            data: {
                                                title: projectTitle,
                                                description: projectDescription,
                                                imageURL: url,
                                                demoLink: projectDemoLink,
                                                githubRepoLink: projectGithubLink
                                            }
                                        });

                                        toggle(false);
                                    });
                            });
                    }
                    else {
                        setErrorDialog({
                            open: true,
                            message: 'El tamaño de la imagen es muy grande.'
                        });
                    }
                }
                else {
                    setErrorDialog({
                        open: true,
                        message: 'El tipo de archivo no es valido.'
                    });
                }
            }
            else {
                setErrorDialog({
                    open: true,
                    message: 'El enlace que has ingresado no es valido.'
                });
            }
        }
        else {
            setErrorDialog({
                open: true,
                message: 'Llena todos los campos requeridos.'
            });
        }

    };

    const handleImageUpload = (event) => {
        if (event.target.files[0]) {
            setProjectImage(event.target.files[0]);
        }
    };

    useEffect(() => {
        if (projectImage) {
            const imagePreviewURL = URL.createObjectURL(projectImage);

            setProjectImagePreview(imagePreviewURL);
        }
    }, [projectImage]);

    return (
        <Dialog
            open={isOpen}
            onClose={() => toggle(false)}
            maxWidth='xl'
            style={{
                overflowX: 'hidden'
            }}
        >
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    Agrega un proyecto que hayas realizado o en el que hayas contribuido.
                </div>

                <div className={styles.project}>
                    <div
                        className={styles.projectImage}
                        style={{
                            backgroundImage: projectImagePreview && `url(${projectImagePreview})`
                        }}
                        onClick={!urlUserID ? (() => projectImageInputRef.click()) : (() => true)}
                    >
                        {!projectImagePreview && <MdImage />}

                        <input
                            type="file"
                            style={{ display: 'none' }}
                            ref={(ref) => setProjectImageInputRef(ref)}
                            onChange={(e) => handleImageUpload(e)}
                            accept="image/png, image/jpeg, image/gif"
                        />
                    </div>

                    <div className={styles.projectInputFields}>
                        <div>
                            <div className={styles.subtitle}>
                                1. Escribe un título para este proyecto
                            </div>

                            <TextField
                                fullWidth
                                value={projectTitle}
                                onChange={(e) => setProjectTitle(e.currentTarget.value)}
                            />
                        </div>

                        <div>
                            <div className={styles.subtitle}>
                                2. Describe resumidamente de que trata este proyecto (250 caractéres max.)
                            </div>

                            <TextField
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.currentTarget.value)}

                                fullWidth
                                rows={4}
                                rowsMax={8}
                                multiline

                                inputProps={{
                                    style: {
                                        fontSize: '.75rem'
                                    },
                                    maxLength: 250
                                }}
                            />
                        </div>

                        <div className={styles.projectLinks}>
                            <div>
                                <div className={styles.subtitle}>
                                    <span>3. Ingresa un enlace para conocer el proyecto. (Live demo)</span>
                                </div>

                                <TextField
                                    fullWidth
                                    value={projectDemoLink}
                                    onChange={(e) => setProjectDemoLink(e.currentTarget.value)}

                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <IoIosGlobe className={styles.textFieldIcon} />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </div>

                            <div>
                                <div className={styles.subtitle}>
                                    4. Ingresa un enlace al repositorio del proyecto (opcional)
                                </div>

                                <TextField
                                    fullWidth
                                    value={projectGithubLink}
                                    onChange={(e) => setProjectGithubLink(e.currentTarget.value)}

                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <GoMarkGithub className={styles.textFieldIcon} />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </div>
                        </div>

                        <Button
                            onClick={() => handleAddProject()}
                            className={styles.createButton}
                            fullWidth
                        >
                            <IoMdAddCircleOutline className={styles.createButtonIcon} />
                            Agregar proyecto
                        </Button>
                    </div>
                </div>



                {
                    /*********** */
                    //Dialogs
                }
                <ErrorDialog
                    isOpen={errorDialog.open}
                    close={() => {
                        setErrorDialog({
                            ...errorDialog,
                            open: false
                        })
                    }}
                    message={errorDialog.message}
                    title='Ha ocurrido un error al añadir el proyecto:'
                />
            </div>
        </Dialog>
    );
}

export default AddProjectDialog;