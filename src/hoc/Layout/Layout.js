import React from 'react';
import Navigation from '../../Components/Navigation/Navigation';
import { ProfileProvider } from './../../Components/Profile/ProfileContext';

const Layout = ({ children }) => {
    return (
        <div>
            <Navigation />
            <ProfileProvider>
                {children}
            </ProfileProvider>
        </div>
    );
}

export default Layout;