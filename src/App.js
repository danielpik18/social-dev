import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Layout from './hoc/Layout/Layout';
import Login from './Components/Login/Login';
import SearchView from './Components/SearchView/SearchView';

import { AuthProvider } from './Contexts/AuthContext';
import PrivateRoute from './hoc/PrivateRoute';
import { ProfileProvider } from './Components/Profile/ProfileContext';
import { SearchViewProvider } from './Components/SearchView/SearchViewContext';
import { SearchFiltersProvider } from './Components/Navigation/SearchBar/SearchFilters/SearchFiltersContext';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AuthProvider>
        <SearchFiltersProvider>
          <SearchViewProvider>
            <Layout>
              <Switch>
                <Route component={Home} exact path='/' />

                <PrivateRoute
                  exact
                  path='/profile/:id?'
                  component={Profile}
                  provider={ProfileProvider}
                />

                <Route path='/login' component={Login} />

                <Route
                  exact
                  path='/search/:techTags?/:yearsOfExperience?'
                  component={SearchView}
                />

              </Switch>
            </Layout>

          </SearchViewProvider>
        </SearchFiltersProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;