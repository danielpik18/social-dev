import React, { Component } from 'react';

const UserContext = React.createContext();

class UserContextProvider extends Component {
    state = {
        user: null
    }

    updateUser = (user) => {
        this.setState({ user });

        console.log('user success');
    };

    render() {
        const { context: UserContext, children } = this.props;

        return (
            <UserContext.Provider value={{
                user: { ...this.state },
                updateUserData: this.updateUserData
            }}>
                {children}
            </UserContext.Provider >
        );
    }
}

export default UserContext;

export {
    UserContext,
    UserContextProvider
}

