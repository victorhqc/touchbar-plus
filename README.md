# touchbar-plus package

Add Touchbar support for Atom.

## Features

- UI changes depending on the active pane.

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

## Coming Features

At this point there's not an option to customize the Touch-bar. But it is intended this way in its
first release.
