import React, { useContext, useState, useEffect } from 'react';
import styles from './UserHeader.module.scss';
import ReactLoading from 'react-loading';
import { Typography, Fab, Tooltip } from '@material-ui/core';
import { FaRocketchat } from 'react-icons/fa';
import { TiHeartOutline } from 'react-icons/ti';

import SocialMediaButtons from './SocialMediaButtons/SocialMediaButtons';
import UserRatings from './UserRatings/UserRatings';
import { ProfileContext } from '../ProfileContext';
import { reBase, storage } from './../../../firebase';
import { AuthContext } from '../../../Contexts/AuthContext';
import { MessagesFabContext } from '../../MessagesFab/MessagesFabContext';
import { ConversationViewContext } from '../../MessagesFab/MessagesPopover/ConversationView/ConversationViewContext';

const UserHeader = () => {
    const { currentUser, currentUserData } = useContext(AuthContext);
    const {
        user,
        urlUserID
    } = useContext(ProfileContext);

    const { setPopoverOpen } = useContext(MessagesFabContext);
    const { setCurrentConversationID } = useContext(ConversationViewContext);

    const [refs, setRefs] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const [userImageLoading, setUserImageLoading] = useState(false);

    const handleChatWithUser = () => {
        //console.log('urluserID:', urlUserID);
        setCurrentConversationID(urlUserID);
        setPopoverOpen(true);
    }

    const handleImageUpload = (event) => {
        if (event.target.files[0]) {
            setUserImage(event.target.files[0]);
        }
    }

    useEffect(() => {
        /* eslint-disable */

        const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/gif'];

        if (userImage) {
            //console.log(userImage);

            if (acceptedFileTypes.includes(userImage.type)) {
                if (userImage.size <= 350000) {
                    const uploadTask = storage
                        .ref(`images/${userImage.name}`)
                        .put(userImage);

                    uploadTask.on('state_changed',
                        (snapshot) => {
                            !snapshot.metadata
                                ? setUserImageLoading(true)
                                : setUserImageLoading(false)
                        },
                        (error) => {
                            console.log(error);
                        },
                        () => {
                            storage.ref('images')
                                .child(userImage.name)
                                .getDownloadURL()
                                .then(url => {
                                    reBase.post(`users/${currentUser.uid}/profileImageURL`, {
                                        data: url
                                    });
                                });
                        });
                }
                else {
                    console.log('file too large');
                }
            }
            else {
                console.log('wrong file type');
            }
        }
    }, [userImage]);

    return (
        <div className={styles.userHeader}>
            {
                <div
                    className={`${styles.userImage}
                            ${!urlUserID && styles.userImageHover}`}

                    style={{
                        backgroundImage: `url(${user.profileImageURL})`
                    }}

                    onClick={!urlUserID ? (() => refs.click()) : (() => true)}
                >
                    {
                        !urlUserID && (
                            <>
                                {
                                    userImageLoading &&
                                    <ReactLoading
                                        type='spin'
                                        color="grey"
                                        className={styles.loader}
                                    />
                                }

                                <input id="myInput"
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={(ref) => setRefs(ref)}
                                    onChange={(e) => handleImageUpload(e)}
                                    accept="image/png, image/jpeg, image/gif"
                                />
                            </>
                        )
                    }

                </div>
            }

            <div className={styles.userHeaderTitle}>
                {
                    <div>
                        <Typography variant='h4' className={styles.userName}>
                            {`${user.name} ${user.lastname}`}
                        </Typography>
                    </div>
                }
            </div>

            <SocialMediaButtons />

            <UserRatings
                ratings={user.ratings && Object.values(user.ratings)}
            />

            {
                urlUserID &&
                (
                    <Tooltip title={`Conversar con ${user.name}`}>
                        <Fab
                            className={styles.messageUserFab}
                            size='small'
                            onClick={() => handleChatWithUser()}
                        >
                            <FaRocketchat />
                        </Fab>
                    </Tooltip>
                )
            }

            {
                urlUserID &&
                (currentUserData.role === 'Reclutador') &&
                <div className={styles.favoriteUser}>
                    <TiHeartOutline />
                </div>
            }
        </div>
    );
}

export default UserHeader;