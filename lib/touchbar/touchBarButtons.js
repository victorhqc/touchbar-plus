'use babel';

export default {
  TextEditor: [
    {
      type: 'button',
      label: '😀 Hello World',
      backgroundColor: '#d9b1b1',
      click: (e) => {
        console.log('e', e);
      },
    },
    {
      type: 'button',
      label: 'Toggle sidebar',
      iconPosition: 'left',
      backgroundColor: '#bb95a4',
      iconColor: '#fff',
      icon: 'NSTouchBarSidebarTemplate',
      click: 'tree-view:toggle',
    },
    {
      type: 'group',
      items: [
        {
          type: 'button',
          label: 'Button 1',
          backgroundColor: '#b3ad99',
        },
        {
          type: 'button',
          label: 'Button 2',
          backgroundColor: '#a3b9b7',
        },
        {
          type: 'button',
          label: 'Button 3',
          backgroundColor: '#b1b1b0',
        },
      ],
    },
  ],
  TreeView: [
    {
      type: 'button',
      label: 'Add File',
      backgroundColor: '#d9b1b1',
      iconColor: '#fff',
      iconPosition: 'left',
      icon: 'octicon-file',
      click: 'tree-view:add-file',
    },
    {
      type: 'button',
      label: 'Add Folder',
      backgroundColor: '#bb95a4',
      iconColor: '#fff',
      iconPosition: 'left',
      icon: 'octicon-file-directory',
      click: 'tree-view:add-folder',
    },
  ],
};
