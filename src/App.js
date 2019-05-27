import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Layout from './hoc/Layout/Layout';
import Login from './Components/Login/Login';
import SearchView from './Components/SearchView/SearchView';

import { AuthProvider, AuthContext } from './Contexts/AuthContext';
import PrivateRoute from './hoc/PrivateRoute';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <Layout>
            <AuthContext.Consumer>
              {context => (
                <Switch>

                  <Route component={Home} exact path='/' />

                  <PrivateRoute path='/profile' component={Profile} />

                  <Route
                    path='/profile:id'
                    render={props => <Profile {...props} authContext={context} />}
                    authContext={context}
                  />

                  <Route path='/login' component={Login} />

                  <Route path='/search' component={SearchView} />

                </Switch>
              )}
            </AuthContext.Consumer>
          </Layout>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;