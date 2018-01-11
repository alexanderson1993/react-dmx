# React DMX

Render React components to DMX light systems.

## The problem

Controlling a handful of lights with DMX is pretty simple and straightforward. However, adding multiple lights or lights with multiple channels (RGB/WA+UV) makes things much more complicated. 

## This solution

React DMX lets you use React components and a special renderer to compose your lighting system just like you would a web app. With a simple `<light>` primitive, you can compose any kind of lighting system imaginable! And, since it's React, you have access to component lifecycle events, state, and reactive updates.

## Installation

This module is distributed via [npm][npm]. It is designed to run only on Node systems, not browsers.

```
npm install --save react-dmx
```

React DMX uses [node-dmx][node-dmx] to send DMX commands to DMX controllers. You must manually install the drivers which node-dmx uses to send these commands. The [node-ftdi][node-ftdi] is recommended.

Since React DMX is intended to be used with JSX, it is recomended you install Babel and the React babel preset as well:

```
npm install --save-dev babel-cli babel-preset-env babel-preset-react
```

Babel's website has more in-depth [installation instructions][babel].

## Usage

Currently, all React DMX instances must use a Universe as the root element. The following will set channel 0 to the maximum level (255):

```javascript
const React = require('react');
const renderer = require('react-dmx');

render(
  <universe
  name="my-universe"
  mode="enttec-usb-dmx-pro"
  port="/dev/cu.usbserial-A7ABR43S">
  <light channel={0} intensity={1} />>
  </universe>
)
```

## API

### `<universe>`

Props:

- **name**: The unique name of the DMX universe
- **mode**: What driver the universe will use. This is based on the drivers available in the `node-dmx` package.
- **port**: The DMX controller device

### `<light>`

Props:

- **channel**: The DMX channel of the light
- **intensity**: (0 - 1) How bright the light should be. This is converted to a number from 0 to 255

## DMX Modes

- null: a development driver that prints the universe to stdout
- artnet: driver for EnttecODE
- bbdmx: driver for [BeagleBone-DMX](https://github.com/boxysean/beaglebone-DMX)
- dmx4all: driver for DMX4ALL devices like the "NanoDMX USB Interface"
- enttec-usb-dmx-pro: a driver for devices using a Enttec USB DMX Pro chip like the "DMXKing ultraDMX Micro".
- enttec-open-usb-dmx: driver for "Enttec Open DMX USB". This device is NOT recommended, there are known hardware limitations and this driver is not very stable. (If possible better obtain a device with the "pro" chip)
- dmxking-utra-dmx-pro: driver for the DMXKing Ultra DMX pro interface. This driver support multiple universe specify the options with Port = A or B


## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node-dmx]: https://github.com/wiedi/node-dmx
[node-ftdi]:https://github.com/thomaschaaf/node-ftdi
[babel]: https://babeljs.io/docs/setup/#installation