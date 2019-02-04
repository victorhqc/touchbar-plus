'use babel';

export default {
  TextEditor: [
    {
      type: 'button',
      iconColor: '#fff',
      icon: 'NSTouchBarSidebarTemplate',
      click: 'tree-view:toggle',
    },
    {
      type: 'button',
      label: 'Unfold code',
      iconPosition: 'left',
      iconColor: '#fff',
      icon: 'octicon-unfold',
      click: 'editor:unfold-all',
    },
    // {
    //   type: 'button',
    //   label: 'Fold code (2)',
    //   iconPosition: 'left',
    //   iconColor: '#fff',
    //   icon: 'octicon-fold',
    //   click: 'editor:fold-at-indent-level-2',
    // },
    {
      type: 'popover',
      label: 'Fold code',
      iconColor: '#fff',
      icon: 'octicon-fold',
      items: [
        {
          type: 'scrubber',
          selectedStyle: 'outline',
          // mode: 'fixed',
          items: [
            {
              label: 'Indent level 1',
              iconColor: '#fff',
              icon: 'octicon-fold',
            },
            {
              label: 'Indent level 2',
              iconColor: '#fff',
              icon: 'octicon-fold',
            },
            {
              label: 'Indent level 3',
              iconColor: '#fff',
              icon: 'octicon-fold',
            },
            {
              label: 'Indent level 4',
              iconColor: '#fff',
              icon: 'octicon-fold',
            },
            {
              label: 'Indent level 5',
              iconColor: '#fff',
              icon: 'octicon-fold',
            },
          ],
        },
      ],
    },
  ],
  TreeView: [
    {
      type: 'button',
      iconColor: '#fff',
      icon: 'NSTouchBarSidebarTemplate',
      click: 'tree-view:toggle',
    },
    {
      type: 'button',
      label: 'Add File',
      // backgroundColor: '#d9b1b1',
      iconColor: '#fff',
      iconPosition: 'left',
      icon: 'octicon-file',
      click: 'tree-view:add-file',
    },
    {
      type: 'button',
      label: 'Add Folder',
      // backgroundColor: '#bb95a4',
      iconColor: '#fff',
      iconPosition: 'left',
      icon: 'octicon-file-directory',
      click: 'tree-view:add-folder',
    },
  ],
};
