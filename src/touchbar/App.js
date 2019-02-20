'use babel';

import React from 'react';
import { Switch, Route } from 'react-router';

import TextEditor from './views/TextEditor';
import TreeView from './views/TreeView';

const App = () => (
  <Switch>
    <Route path="/texteditor" component={TextEditor} />
    <Route path="/treeview" component={TreeView} />
  </Switch>
);

export default App;
