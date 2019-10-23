import { TreeView } from '../@types/';

export class TreeViewManager {
  private treeView: TreeView | null;

  constructor() {
    this.treeView = null;
  }

  setTreeView(treeView: TreeView) {
    this.treeView = treeView;
  }

  getTreeView() {
    if (!this.treeView) {
      throw new Error('Tree view is not ready yet');
    }

    return this.treeView;
  }
}

const treeViewSingleton = new TreeViewManager();

export default treeViewSingleton;
