import React from 'react';
import { Switch, Route } from 'react-router';

import BlankPage from './views/BlankPage';
import TextEditor from './views/TextEditor';
import TreeView from './views/TreeView';
import Github from './views/Github';
import SettingsPage from './views/SettingsPage';

const App = () => (
  <Switch>
    <Route path="/__unknown__" component={BlankPage} />
    <Route path="/texteditor" component={TextEditor} />
    <Route path="/treeview" component={TreeView} />
    <Route path="/github-pane" component={Github} />
    <Route path="/settingsview" component={SettingsPage} />
  </Switch>
);

export default App;
