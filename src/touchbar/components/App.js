'use babel';

import React from 'react';
import { Switch, Route } from 'react-router';

import TextEditor from './TextEditor';
import TreeView from './TreeView';

const App = () => (
  <Switch>
    <Route path="/texteditor" component={TextEditor} />
    <Route path="/treeview" component={TreeView} />
  </Switch>
);

export default App;
