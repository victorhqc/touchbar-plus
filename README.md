# touchbar-plus package

Add Touch-bar support for Atom.

## Motivation

The touch-bar is an interesting interface in the MacBook, though sometimes feels a bit gimmicky. Why
would someone use it since keyboard shortcuts exist? For simple shortcuts like `ctrl-c` doesn't
make sense, people usually know those universally shortcuts. But have you looked at atom's shortcuts
list? Every package can register new shortcuts. Just reading the list takes time, more so to
memorize all of them.

There are some applications that use the touch-bar brilliantly, making it actually something useful.
Those interfaces have some "awareness" about what's being used by the user. This package attempts
to use the active Pane as a reference to show different things that might be useful at that moment.

This of course, is an iterative learning & development. This first release might feel a bit
gimmicky, because maybe the touch-bar is just that, just a gimmick. But maybe it turns to be
something useful, that I'll leave for you to decide.

## Features

- UI changes depending on the active pane.
- Works out of the box (pre-made configurations).
- TODO: Allow for configuration.

## Default Interfaces

### WIP: Text Editor View
When active pane is the text editor.

![Text editor touch-bar buttons](https://imgur.com/1wq4W9D.png)

**Buttons:**

- Toggle `tree-view` pane.
- Navigate to the left (tab to the left).
- Navigate to the right (tab to the right).
- Toggle `git` pane.
- Toggle `command-palette`.
- Fold & Unfold code by levels.
- **WIP**

### Tree View
When active pane is the `tree-view`

![Tree view touch-bar buttons](https://imgur.com/msnxRGM.png)

**Buttons:**

- Toggle `tree-view` pane.
- New file.
- New folder.
- Toggle `git` pane.
- Toggle `command-palette`.
- Rename active item.
- Duplicate active item.

### Git Pane
When active pane is the git "editor".

![Git pane touch-bar buttons](https://imgur.com/GuqdyM6.png)

**Buttons:**

- Toggle `tree-view` pane.
- Fetch remote.
- Toggle `github` pane.
- Toggle `git` pane.
- Toggle `command-palette`.
- Pull.
- Push.

### Settings Page
When settings page is open.

![Settings touch-bar buttons](https://imgur.com/8xhMtO3.png)

**Buttons:**

- Navigate to _core_ settings.
- Navigate to _editor_ settings.
- Navigate to _URI handling_ settings.
- Navigate to _keybindings_ settings.
- Navigate to _packages_ settings.
- Navigate to _themes_ settings.
- Navigate to _updates_ settings.
- Navigate to _install_ settings.

### Unknown Page
When `touchbar-plus` is not sure which pane or page is displayed.

![Unknown page buttons](https://imgur.com/lzwpwsn.png)

**Buttons:**

- Toggle `tree-view` pane.
- Open file/project.
- Open settings.
- Toggle `git` pane.
- Toggle `command-palette`.

## The Future

In this first release, is not clear how to use the touch-bar. Feel free to propose ideas as issues.
Interesting ideas and use-cases may be around the corner!

## Development

First install dependencies & run initial build and compilation.

```sh
npm i
npm run compile

# Now we need to rebuild modules targeting Atom's Electron version for "node-canvas" which is needed
# to render images.
npm run rebuild
# Make sure apm is installed https://flight-manual.atom.io/getting-started/sections/installing-atom/
apm rebuild
```

Then for regular development

```sh
npm run compile:watch
```

And open Atom in development mode

```
atom --dev .
```

Then, to check if the changes are working, just refresh the atom window: _"Command Pallette"_ ->
_"Window: Reload"_.
