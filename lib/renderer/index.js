'use babel';

import Reconciler from 'react-reconciler';
import { TouchBar as NativeTouchBar, nativeImage } from 'remote';
import difference from 'lodash/difference';
import some from 'lodash/some';

const {
  TouchBarGroup,
  TouchBarPopover,
  TouchBarButton,
  TouchBarScrubber,
} = NativeTouchBar;

const MOUSE_EVENTS = [
  'onClick',
  'onContextMenu',
  'onDoubleClick',
  'onDrag',
  'onDragEnd',
  'onDragEnter',
  'onDragExit',
  'onDragLeave',
  'onDragOver',
  'onDragStart',
  'onDrop',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',
];

function warnAboutUserInteractions(element, newProps, acceptedEvents) {
  const notValidEvents = difference(MOUSE_EVENTS, acceptedEvents);

  some(newProps, (prop) => {
    if (notValidEvents.indexOf(prop) >= 0) {
      console.warn(`${element} does not support event: ${prop}`);
      return true;
    }

    return false;
  });
}

function attachChildrenText(type, newProps) {
  switch (type) {
    case 'touch-button':
      // Swap children for label.
      return {
        ...newProps,
        children: undefined,
        label: newProps.children,
      };
    default:
      return null;
  }
}

function createTouchBarButton(type, newProps) {
  const { onClick, ...props } = newProps;

  warnAboutUserInteractions('TouchBarButton', newProps, ['onClick']);

  // console.log('CREATING BUTTON WITH PROPS', {
  //   ...attachChildrenText(type, props),
  //   click: onClick,
  // });

  return new TouchBarButton({
    ...attachChildrenText(type, props),
    click: onClick,
  });
}

function createTouchBarElement(type, newProps) {
  switch (type) {
    case 'group':
      return new TouchBarGroup(newProps);
    case 'touch-button':
      return createTouchBarButton(type, newProps);
    case 'popover':
      return new TouchBarPopover(newProps);
    case 'scrubber':
      return new TouchBarScrubber(newProps);
    default:
      console.warn(`Component with type: ${type} is not supported`);
      return null;
  }
}

const HostConfig = {
  now: Date.now,
  supportsMutation: true,
  getRootHostContext: function getRootHostContext() {
    return {};
  },
  getChildHostContext: function getChildHostContext() {
    return {};
  },
  shouldSetTextContent: function shouldSetTextContent() {
    return false;
  },
  createTextInstance: function createTextInstance() {
    // return newText;
  },
  createInstance: function createInstance(type, newProps) {
    return createTouchBarElement(type, newProps);
  },
  appendInitialChild: function appendInitialChild(parent, child) { // parent, child
    // console.log('appendInitialChild');
    // console.log('parent', parent);
    // console.log('child', child);
    // parent.appendChild(child);
  },
  finalizeInitialChildren: function finalizeInitialChildren() {
    return {};
  },
  prepareForCommit: function prepareForCommit() {},
  resetAfterCommit: function resetAfterCommit(root) {
    atom.getCurrentWindow().setTouchBar(root.createInstance());
  },
  commitMount: function commitMount() {},
  appendChildToContainer: function appendChildToContainer(parent, child) { // parentInstance, child
    parent.appendChild(child);
  },
  appendChild: function appendChild(...args) { // parentInstance, child
    // console.log('appendChild', ...args);
  },
  insertBefore: function insertBefore(...args) { // parentInstance, child, beforeChild
    // console.log('insertBefore', ...args);
  },
  removeChild: function removeChild(...args) { // parentInstance, child
    // console.log('removeChild', ...args);
  },
  removeChildFromContainer: function removeChildFromContainer(...args) { // container, child
    // console.log('removeChildFromContainer', ...args);
  },
  insertInContainerBefore: function insertInContainerBefore(...args) {
    // container, child, beforeChild
    // console.log('insertInContainerBefore', ...args);
  },
  prepareUpdate: function prepareUpdate() {
    return undefined;
  },
  commitUpdate: function commitUpdate() {
    return undefined;
  },
  commitTextUpdate: function commitTextUpdate(...args) { // textInstance, oldText, newText
    // console.log('commitTextUpdate', ...args);
  },
  resetTextContent: function resetTextContent() {

  },
  shouldDeprioritizeSubtree: function shouldDeprioritizeSubtree(type, nextProps) {
    return !!nextProps.hidden;
  },
};

const reconcilerInstance = Reconciler(HostConfig);

const CustomRenderer = {
  render(element, renderDom, callback) {
    // element: This is the react element for App component
    // renderDom: This is the host root element to which the rendered app will be attached.
    // callback: if specified will be called after render is done.

    // Disables async rendering, read more about it here:
    // https://github.com/facebook/react/issues/13206#issuecomment-407535077
    const isAsync = false;
    // Creates root fiber node.
    const container = reconcilerInstance.createContainer(renderDom, isAsync);

    // Since there is no parent (since this is the root fiber). We set parentComponent to null.
    const parentComponent = null;

    // Start reconcilation and render the result
    reconcilerInstance.updateContainer(
      element,
      container,
      parentComponent,
      callback,
    );
  },
};

module.exports = CustomRenderer;
