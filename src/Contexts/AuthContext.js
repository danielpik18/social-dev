import React, { Component } from 'react';
import { fire } from './../firebase';

const AuthContext = React.createContext();

class AuthProvider extends Component {
    state = {
        currentUser: null
    }

    componentDidMount() {
        fire.auth()
            .onAuthStateChanged(user => this.setState({
                currentUser: user
            }));
    }

    render() {
        const { children } = this.props;

        return (
            <AuthContext.Provider
                value={{
                    currentUser: this.state.currentUser
                }}
            >
                {children}
            </AuthContext.Provider>
        );
    }
}

export {
    AuthContext,
    AuthProvider
};