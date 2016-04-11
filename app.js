'use strict';
const argv = require('minimist')(process.argv.slice(2));
const Denon = require('./denon-avr/lib/app.js');
const denon = new Denon(new Denon.transports.telnet({
  host: '192.168.2.251',     // IP address or hostname
  debug: true   // Debug enabled
}));

denon.on('connect', () => {
  if (typeof argv.volume !== 'undefined') {
    denon.setVolumeDb(argv['volume'], function(err, volume) {
      console.log("K")
      denon.getConnection().destroy();
      return;
    });
  }
});

denon.on('error', (err) => {
  console.log(err)
});

if (typeof argv.volume !== 'undefined') {
  denon.connect();
}

console.log(argv)
