import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Layout from './hoc/Layout/Layout';
import Login from './Components/Login/Login';
import SearchView from './Components/SearchView/SearchView';

import { AuthProvider, AuthContext } from './Contexts/AuthContext';
import PrivateRoute from './hoc/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Layout>
          <Switch>
            <Route component={Home} exact path='/' />

            <PrivateRoute
              path='/profile'
              component={Profile}
            />

            <Route exact path='/profile:id' component={Profile} />

            <Route path='/login' component={Login} />

            <Route path='/search' component={SearchView} />
          </Switch>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;