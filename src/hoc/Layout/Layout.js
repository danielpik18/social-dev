import React, { useContext } from 'react';
import Navigation from '../../Components/Navigation/Navigation';
import MessagesFab from './../../Components/MessagesFab/MessagesFab';
import { AuthContext } from '../../Contexts/AuthContext';
import { MessagesFabProvider } from '../../Components/MessagesFab/MessagesFabContext';
import { MessagesPopoverProvider } from '../../Components/MessagesFab/MessagesPopover/MessagesPopoverContext';
import { ConversationViewProvider } from '../../Components/MessagesFab/MessagesPopover/ConversationView/ConversationViewContext';

const Layout = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div>
            <MessagesFabProvider>
                <MessagesPopoverProvider>
                    <ConversationViewProvider>
                        <Navigation />

                        {children}
                        {
                            currentUser &&
                            (
                                <MessagesFab />
                            )
                        }
                    </ConversationViewProvider>
                </MessagesPopoverProvider>
            </MessagesFabProvider>
        </div>
    );
}

export default Layout;