import React, { useContext, useState, useEffect } from 'react';
import styles from './Projects.module.scss';
import { ProfileContext } from './../../../Profile/ProfileContext';
import { AuthContext } from './../../../../Contexts/AuthContext';
import { getArrayfromObjectWithKeysAsID } from './../../../../utils/misc';
import { IoIosGlobe, IoMdTrash } from 'react-icons/io';
import { GoMarkGithub } from 'react-icons/go';
import ReactLoading from 'react-loading';
import { Tooltip, TextField } from '@material-ui/core';
import AddItemButton from './../../../AddItemButton/AddItemButton';
import cssColors from './../../../../scss/_colors.scss';
import ConfirmDeleteDialog from '../../../Dialogs/ConfirmDeleteDialog/ConfirmDeleteDialog';
import { reBase, storage } from '../../../../firebase';
import ConfirmLinkDialog from './../../../Dialogs/ConfirmLinkDialog/ConfirmLinkDialog';
import AddProjectDialog from './AddProjectDialog/AddProjectDialog';
import ErrorDialog from '../../../Dialogs/ErrorDialog/ErrorDialog';

const Projects = () => {
    const { user, urlUserID } = useContext(ProfileContext);
    const { currentUser, currentUserData } = useContext(AuthContext);

    const [showRemoveProjectDialog, setShowRemoveProjectDialog] = useState(false);
    const [projectToBeDeleted, setProjectToBeDeleted] = useState(null);

    const [projectImage, setProjectImage] = useState(null);
    const [projectImageInputRef, setProjectImageInputRef] = useState(null);
    const [projectImageLoading, setProjectImageLoading] = useState(false);

    const [confirmLinkDialogOpen, setConfirmLinkDialogOpen] = useState(false);
    const [linkToBeEdited, setLinkToBeEdited] = useState(null);
    const [linkPlaceholder, setLinkPlaceholder] = useState(null);
    const [projectToHaveLinksEdited, setProjectToHaveLinksEdited] = useState(null);

    const [projectToBeEdited, setProjectToBeEdited] = useState('');
    const [projectTitleEdited, setProjectTitleEdited] = useState('');
    const [projectDescriptionEdited, setProjectDescriptionEdited] = useState('');

    const [addProjectDialogOpen, setAddProjectDialogOpen] = useState(false);

    const [errorDialog, setErrorDialog] = useState({
        open: false,
        message: '',
        title: ''
    });

    let projectsWithID;

    useEffect(() => {
        if (projectToBeDeleted) {
            setShowRemoveProjectDialog(true);
        }
        else {
            setShowRemoveProjectDialog(false);
        }
    }, [projectToBeDeleted]);

    useEffect(() => {
        if (projectImage) {
            const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/gif'];

            if (acceptedFileTypes.includes(projectImage.type)) {
                if (projectImage.size <= 350000) {
                    const uploadTask = storage
                        .ref(`images/${projectImage.name}`)
                        .put(projectImage);

                    uploadTask.on('state_changed',
                        (snapshot) => {
                            !snapshot.metadata
                                ? setProjectImageLoading(true)
                                : setProjectImageLoading(false)
                        },
                        (error) => {
                            console.log(error);
                        },
                        () => {
                            storage.ref('images')
                                .child(projectImage.name)
                                .getDownloadURL()
                                .then(url => {

                                    reBase.update(`users/${currentUser.uid}/projects/${projectToBeEdited}`, {
                                        data: {
                                            imageURL: url
                                        }
                                    });


                                    console.log('uploaded');
                                });
                        });
                }
                else {
                    setErrorDialog({
                        open: true,
                        message: 'El tamaño de la imagen es muy grande',
                        title: 'Ha ocurrido un error al actualizar la imagen:'
                    });
                }
            }
            else {
                setErrorDialog({
                    open: true,
                    message: 'El tipo de archivo no es valido.',
                    title: 'Ha ocurrido un error al actualizar la imagen:'
                });
            }
        }
    }, [projectImage]);

    const handleDeleteProject = () => {
        reBase.remove(`users/${currentUser.uid}/projects/${projectToBeDeleted}`,
            error => error && console.log(error));

        setShowRemoveProjectDialog(false);
    };

    const handleEditProject = (projectID, ...rest) => {
        if (currentUserData.projects) {
            setProjectToBeEdited(projectID);

            if (currentUserData.projects[projectID].title === rest[0]) {
                setProjectTitleEdited(rest[0]);
            }
            else if (currentUserData.projects[projectID].description === rest[0]) {
                setProjectDescriptionEdited(rest[0]);
            }
        }
    };

    const handleConfirmProjectEdit = (projectID, fieldName) => {
        let dataToUpdate = (
            fieldName === 'title' ? projectTitleEdited
                : projectDescriptionEdited
        );

        reBase.update(`users/${currentUser.uid}/projects/${projectID}`, {
            data: {
                [fieldName]: dataToUpdate
            }
        });

        setProjectToBeEdited('');
        setProjectTitleEdited('');
        setProjectDescriptionEdited('');
    };

    const handleEditProjectLinks = (linkName, projectID) => {
        setLinkToBeEdited(linkName);
        setProjectToHaveLinksEdited(projectID);
        setConfirmLinkDialogOpen(true);

        if (currentUserData.projects) {
            if (currentUserData.projects[projectID][linkName]) {
                setLinkPlaceholder(currentUserData.projects[projectID][linkName]);
            }
            else if (linkName === 'githubLink') {
                setLinkPlaceholder('Ingresa el enlace a tu perfil de Github.');
            }
            else {
                setLinkPlaceholder('Ingresa un enlace al sitio del proyecto.');
            }
        }
    };

    const handleImageUpload = (event) => {
        if (event.target.files[0]) {
            setProjectImage(event.target.files[0]);
        }
    };

    const confirmLink = (link) => {
        if (
            linkToBeEdited &&
            projectToHaveLinksEdited
        ) {
            reBase.post(`users/${currentUser.uid}/projects/${projectToHaveLinksEdited}/${linkToBeEdited}`, {
                data: link
            });

            setConfirmLinkDialogOpen(false);
        }
    };

    if (user && user.projects) {
        projectsWithID = getArrayfromObjectWithKeysAsID(user.projects);
    };

    return (
        <div className={styles.projectsWrapper}>
            <div className={styles.projectsTitle}>
                Proyectos realizados
            </div>

            <div className={styles.projectsList}>

                {
                    projectsWithID ? (
                        projectsWithID.map(project => {

                            return (
                                <div
                                    key={project.id}
                                    className={`${styles.projectItem}`}
                                >
                                    <div
                                        className={`
                                        ${styles.projectItemImage}
                                        ${!urlUserID && styles.projectItemImageHover}
                                        `}
                                        style={{
                                            backgroundImage: `url(${project.imageURL})`,

                                        }}

                                        onClick={
                                            projectImageInputRef
                                                ? (() => {
                                                    setProjectToBeEdited(project.id);
                                                    projectImageInputRef.click();
                                                })
                                                : (() => true)}
                                    >
                                        {
                                            projectImageLoading &&
                                            (projectToBeEdited === project.id) &&
                                            < ReactLoading
                                                type='spin'
                                                color="grey"
                                                className={styles.loader}
                                            />
                                        }
                                    </div>

                                    <div className={styles.projectItemInfo}>
                                        {
                                            (
                                                (projectToBeEdited === project.id)
                                                && projectTitleEdited
                                            ) ? (
                                                    <TextField
                                                        value={projectTitleEdited}
                                                        autoFocus
                                                        inputProps={{
                                                            className: styles.editProjectTextField,
                                                        }}
                                                        InputProps={{
                                                            disableUnderline: true
                                                        }}
                                                        onBlur={() => handleConfirmProjectEdit(project.id, 'title')}
                                                        onChange={(e) => setProjectTitleEdited(e.currentTarget.value)}
                                                    />
                                                ) : (
                                                    <div
                                                        className={styles.projectItemInfoTitle}
                                                        onClick={() => !urlUserID && handleEditProject(project.id, project.title)}
                                                        style={{ cursor: !urlUserID ? 'pointer' : 'normal' }}
                                                    >
                                                        {project.title}
                                                    </div>
                                                )
                                        }

                                        {
                                            (
                                                (projectToBeEdited === project.id)
                                                && projectDescriptionEdited
                                            ) ? (
                                                    <TextField
                                                        value={projectDescriptionEdited}
                                                        autoFocus
                                                        multiline
                                                        fullWidth
                                                        inputProps={{
                                                            className: styles.editProjectTextArea,
                                                        }}
                                                        InputProps={{
                                                            disableUnderline: true
                                                        }}
                                                        onBlur={() => handleConfirmProjectEdit(project.id, 'description')}
                                                        onChange={(e) => setProjectDescriptionEdited(e.currentTarget.value)}
                                                    />
                                                ) : (
                                                    <div
                                                        className={styles.projectItemInfoDescription}
                                                        onClick={() => !urlUserID && handleEditProject(project.id, project.description)}
                                                        style={{ cursor: !urlUserID ? 'pointer' : 'normal' }}
                                                    >
                                                        {project.description}
                                                    </div>
                                                )
                                        }
                                    </div>

                                    <div className={styles.projectItemSlidingInfo}>
                                        <Tooltip title={
                                            urlUserID
                                                ? 'Visitar sitio del proyecto'
                                                : 'Editar enlace al sitio del proyecto'
                                        }>
                                            <a
                                                name='demoLink'
                                                className={styles.projectItemSlidingInfoIcon}
                                                href={urlUserID && project.demoLink}
                                                target='_blank'
                                                onClick={(e) => !urlUserID && handleEditProjectLinks(e.currentTarget.name, project.id)}
                                            >
                                                <IoIosGlobe />
                                            </a>
                                        </Tooltip>

                                        {
                                            (!urlUserID || project.githubLink) &&
                                            <Tooltip title={
                                                urlUserID
                                                    ? 'Visitar el repositorio del proyecto'
                                                    : 'Editar enlace al repositorio del proyecto'
                                            }>
                                                <a
                                                    name='githubLink'
                                                    className={styles.projectItemSlidingInfoIcon}
                                                    href={urlUserID && project.githubLink}
                                                    target='_blank'
                                                    onClick={(e) => !urlUserID && handleEditProjectLinks(e.currentTarget.name, project.id)}
                                                >
                                                    <GoMarkGithub />
                                                </a>
                                            </Tooltip>
                                        }

                                        {
                                            !urlUserID &&
                                            <div
                                                onClick={() => setProjectToBeDeleted(project.id)}
                                                className={styles.projectItemSlidingInfoIcon}
                                                style={{
                                                    color: cssColors.redLight
                                                }}
                                            >
                                                <IoMdTrash />
                                            </div>
                                        }
                                    </div>

                                    {
                                        !urlUserID &&
                                        < input
                                            type="file"
                                            style={{ display: 'none' }}
                                            ref={(ref) => setProjectImageInputRef(ref)}
                                            onChange={(e) => handleImageUpload(e)}
                                            accept="image/png, image/jpeg, image/gif"
                                        />
                                    }
                                </div>
                            )
                        })
                    ) : (
                            <div className={styles.noProjects}>
                                No se han agregado proyectos
                        </div>
                        )
                }
            </div>

            {
                !urlUserID &&
                <AddItemButton
                    text='Agregar proyecto'
                    clicked={() => setAddProjectDialogOpen(true)}
                />
            }


            {
                /****************** */
                //Dialogs
            }

            <ConfirmDeleteDialog
                isOpen={showRemoveProjectDialog}
                close={() => setProjectToBeDeleted(null)}
                confirm={() => {
                    handleDeleteProject();
                }}
                title='Confirmar eliminación.'
                message='¿Estas seguro de querer borrar este artículo?'
            />

            {
                confirmLinkDialogOpen &&
                <ConfirmLinkDialog
                    isOpen={confirmLinkDialogOpen}
                    placeholder={linkPlaceholder}
                    toggle={setConfirmLinkDialogOpen}
                    confirm={confirmLink}
                />
            }

            {
                addProjectDialogOpen &&
                <AddProjectDialog
                    isOpen={addProjectDialogOpen}
                    toggle={setAddProjectDialogOpen}
                />
            }

            {
                <ErrorDialog
                    isOpen={errorDialog.open}
                    close={() => {
                        setErrorDialog({
                            ...errorDialog,
                            open: false
                        })
                    }}
                    message={errorDialog.message}
                    title={errorDialog.title}
                />
            }
        </div>
    );
}

export default Projects;