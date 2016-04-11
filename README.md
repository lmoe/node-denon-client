# node-denon-avr
A handy node library which allows you to control and receive events of a Denon AVR.

# Docs
A yuidoc based documentation is available here:
http://lmoe.github.io/node-denon-client/classes/Denon.html

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
 * Denon is now an object with containing DenonClient and Options.
 * Use the DenonClient to send requests. Use the Options to define the data.
 */
const denonClient = new Denon.DenonClient(`${DenonAVRHost}`);

// Subscribe to any available event
denon.on('masterVolumeChanged', (volume) => {
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
