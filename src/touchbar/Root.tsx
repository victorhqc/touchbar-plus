import React, { FC } from 'react';
import { History } from 'history';
import { Router } from 'react-router';
import App from './App';

const Root: FC<Props> = ({ history }) => (
  <Router history={history}>
    <App />
  </Router>
);

export default Root;

interface Props {
  history: History;
}
