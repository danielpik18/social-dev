import React, { useState, useContext } from 'react';
import {
    Tooltip
} from '@material-ui/core';

import {
    IoLogoGithub,
    IoLogoLinkedin
} from 'react-icons/io';

import styles from './SocialMediaButtons.module.scss';
import ConfirmLinkModal from '../ConfirmLinkModal/ConfirmLinkModal';
import { ProfileContext } from '../../ProfileContext';

const SocialMediaButtons = () => {
    const [confirmModalOpen, toggleConfirmModal] = useState(false);
    const [clickedLinkTitle, setClickedLinkTitle] = useState('');
    const { user, urlUserID } = useContext(ProfileContext);

    const handleClick = (linkTitle) => {
        setClickedLinkTitle(linkTitle);
        toggleConfirmModal(!confirmModalOpen);
    }

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
                    link.display &&
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
                confirmModalOpen &&
                <ConfirmLinkModal
                    isOpen={confirmModalOpen}
                    toggle={toggleConfirmModal}
                    linkTitle={clickedLinkTitle}
                />
            }
        </div>
    );
}

export default SocialMediaButtons;