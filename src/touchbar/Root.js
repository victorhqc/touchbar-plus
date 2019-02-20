'use babel';

import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router';
import App from './App';

const Root = ({ history }) => (
  <Router history={history}>
    <App />
  </Router>
);

Root.propTypes = {
  history: PropTypes.shape({}),
};

export default Root;
