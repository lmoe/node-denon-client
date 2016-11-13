# denon-avr
A handy node library which allows you to control and receive events of a Denon AVR.

# Few words

This library is not complete. There are functions missing.
Feel free to contribute by doing pull requests. New functions are easy to implement.

Get the protocol specification here:
http://assets.denon.com/documentmaster/de/avr3313ci_protocol_v02.pdf

The protocol is pretty unified so any Denon AVR should be somewhat compatible.

# Docs
A yuidoc based documentation is available here:
http://lmoe.github.io/node-denon-client

# Introduction

This library is designed to provide a simple way to operate with a Denon AVR. Making it an easy use in your own IoT project, or any lazy remote after your remote went **missing**.

It's using ES6 functionality and is based on promises. You are still able to receive events though.

Make sure to use strict and a newer version of node. I haven't tested it with a lower version than 5.10.1 yet.

# Examples

Setting up is simple.

```javascript
// Initialization
const Denon = require('denon-client');
/**
 * Denon is now an object containing DenonClient and Options.
 * Use the DenonClient to send requests. Use the Options to define the data.
 */
const denonClient = new Denon.DenonClient(`${DenonAVRHost}`);

// Subscribe to any available event
denonClient.on('masterVolumeChanged', (volume) => {
  // This event will fire every time when the volume changes.
  // Including non requested volume changes (Using a remote, using the volume wheel on the device).

  console.log(`Volume changed to: ${volume}`);
});

// Connecting
denonClient
  .connect()
  .then(() => {
    // Tasty promise chains..
    //
    // You are free to send any command now.

    return denonClient.setInput(Denon.Options.InputOptions.Aux1);
  })
  .then(() => {

    return denonClient.setSurround(Denon.Options.SurroundOptions.Stereo);
  })
  .then(() => {

    return denonClient.setVolume(98); // Destroy neighborhood
  })
  .catch((error) => {
    // Oh noez.
    console.error(error);
  });
```

# Changelog

## 1.0.8
- Fix setVolume not being able to use a volume under 10 or floats.

## 1.0.7
- Remove console.log ..

## 1.0.6
- Fix setVolume returns no promise
- Fix setVolume does not set float values like 22.5 as the denon API requires a non float number (225)

## 1.0.5
- Fix the getVolume functionality as it returned a three digit value when the receiver returns a double (22.5 -> 225)
- Implemented transform methods for each event / hook