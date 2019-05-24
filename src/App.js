import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Layout from './hoc/Layout/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/profile:id' component={Profile} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;