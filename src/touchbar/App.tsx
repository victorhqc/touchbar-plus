import React from 'react';
import { Switch, Route } from 'react-router';
// import RendererDemo from './RendererDemo';
// import DemoReel from './DemoReel';

import BlankPage from './views/BlankPage';
import TextEditor from './views/TextEditor';
import TreeView from './views/TreeView';
import Github from './views/Github';

const App = () => (
  <Switch>
    <Route path="/__unknown__" component={BlankPage} />
    <Route path="/texteditor" component={TextEditor} />
    <Route path="/treeview" component={TreeView} />
    <Route path="/github-pane" component={Github} />
  </Switch>
);

// const App = () => <RendererDemo />;

export default App;
