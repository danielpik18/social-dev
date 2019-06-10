import React, { useState, useContext, useEffect } from 'react';
import {
    Tooltip
} from '@material-ui/core';

import {
    IoLogoGithub,
    IoLogoLinkedin
} from 'react-icons/io';

import styles from './SocialMediaButtons.module.scss';
import { ProfileContext } from '../../ProfileContext';
import ConfirmLinkDialog from '../../../Dialogs/ConfirmLinkDialog/ConfirmLinkDialog';
import { reBase } from '../../../../firebase';
import { AuthContext } from '../../../../Contexts/AuthContext';

const SocialMediaButtons = () => {
    const { user, urlUserID } = useContext(ProfileContext);
    const { currentUser } = useContext(AuthContext);

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [clickedLinkTitle, setClickedLinkTitle] = useState('');

    const handleClick = (linkTitle) => {
        setClickedLinkTitle(linkTitle);
        setConfirmDialogOpen(!confirmDialogOpen);
    }

    const confirmLink = (link) => {
        reBase.post(
            `users/${currentUser.uid}/socialMediaLinks/${clickedLinkTitle}`,
            {
                data: link
            }).catch(err => alert(err));

        setConfirmDialogOpen(false);
    };

    const links = [
        {
            display: user.role === 'Desarrollador',
            userHasLink: (
                (user.socialMediaLinks && user.socialMediaLinks['github'])
                && true
            ),
            displayTitle: 'GitHub',
            linkTagName: 'github',
            icon: <IoLogoGithub />,
            clicked: event => !urlUserID && handleClick(event.currentTarget.name),
            url: (
                (urlUserID && user.socialMediaLinks) &&
                user.socialMediaLinks['github']
            )
        },
        {
            display: true,
            userHasLink: (
                (user.socialMediaLinks && user.socialMediaLinks['linkedin'])
                && true
            ),
            displayTitle: 'LinkedIn',
            linkTagName: 'linkedin',
            icon: <IoLogoLinkedin />,
            clicked: event => !urlUserID && handleClick(event.currentTarget.name),
            url: (
                (urlUserID && user.socialMediaLinks) &&
                user.socialMediaLinks['linkedin']
            )
        }
    ];

    return (
        <div className={styles.socialMediaIcons}>

            {
                links.map(link => (
                    (link.display && (link.userHasLink || !urlUserID)) &&
                    <Tooltip
                        key={link.linkTagName}
                        title={link.displayTitle}
                    >
                        <a
                            style={{ backgroundColor: !link.userHasLink && 'grey' }}
                            name={link.linkTagName}
                            onClick={link.clicked}
                            className={styles.socialMediaIcon}
                            href={link.url}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            {link.icon}
                        </a>
                    </Tooltip>
                ))
            }

            {
                confirmDialogOpen &&
                <ConfirmLinkDialog
                    isOpen={confirmDialogOpen}
                    placeholder={`Ingresa el enlace a tu perfil de ${clickedLinkTitle}`}
                    toggle={setConfirmDialogOpen}
                    confirm={confirmLink}
                />
            }
        </div>
    );
}

export default SocialMediaButtons;