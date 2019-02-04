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
      type: 'scrubber',
      items: [
        {
          label: 'Unfold code',
          iconColor: '#fff',
          icon: 'octicon-unfold',
        },
        {
          label: 'Fold code (1)',
          iconColor: '#fff',
          icon: 'octicon-fold',
        },
        {
          label: 'Fold code (2)',
          iconColor: '#fff',
          icon: 'octicon-fold',
        },
        {
          label: 'Fold code (3)',
          iconColor: '#fff',
          icon: 'octicon-fold',
        },
        {
          label: 'Fold code (4)',
          iconColor: '#fff',
          icon: 'octicon-fold',
        },
        {
          label: 'Fold code (5)',
          iconColor: '#fff',
          icon: 'octicon-fold',
        },
      ],
    },
    // {
    //   type: 'group',
    //   items: [
    //     {
    //       type: 'button',
    //       label: 'Button 1',
    //       backgroundColor: '#b3ad99',
    //     },
    //     {
    //       type: 'button',
    //       label: 'Button 2',
    //       backgroundColor: '#a3b9b7',
    //     },
    //     {
    //       type: 'button',
    //       label: 'Button 3',
    //       backgroundColor: '#b1b1b0',
    //     },
    //   ],
    // },
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
