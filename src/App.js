import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Layout from './hoc/Layout/Layout';
import Login from './Components/Login/Login';
import SearchView from './Components/SearchView/SearchView';

import { AuthProvider } from './Contexts/AuthContext';
import PrivateRoute from './hoc/PrivateRoute';
import { SearchFiltersProvider } from './Components/Navigation/SearchBar/SearchFilters/SearchFiltersContext';
import { SearchViewProvider } from './Components/SearchView/SearchViewContext';

const App = () => {
  return (
    <AuthProvider>
      <SearchFiltersProvider>
        <SearchViewProvider>
          <Router basename={process.env.PUBLIC_URL}>
            <Layout>
              <Switch>
                <Route component={Home} exact path='/' />

                <PrivateRoute
                  exact
                  path='/profile/:id?'
                  component={Profile}
                />

                <Route path='/login' component={Login} />

                <Route
                  exact
                  path='/search/:techTags?/:yearsOfExperience?'
                  component={SearchView}
                />

              </Switch>
            </Layout>
          </Router>
        </SearchViewProvider>
      </SearchFiltersProvider>
    </AuthProvider>
  );
}

export default App;