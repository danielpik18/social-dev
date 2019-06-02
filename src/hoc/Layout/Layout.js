import React, { useContext } from 'react';
import Navigation from '../../Components/Navigation/Navigation';
import { ProfileProvider } from './../../Components/Profile/ProfileContext';
import MessagesFab from './../../Components/MessagesFab/MessagesFab';
import { AuthContext } from '../../Contexts/AuthContext';
import { MessagesFabProvider } from '../../Components/MessagesFab/MessagesFabContext';

const Layout = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div>
            <Navigation />

            <MessagesFabProvider>
                <ProfileProvider>
                    {children}
                </ProfileProvider>

                {
                    currentUser &&
                    (

                        <MessagesFab />

                    )
                }

            </MessagesFabProvider>
        </div>
    );
}

export default Layout;