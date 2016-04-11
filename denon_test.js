const Denon = require('./lib/denon_client');
const denon = new Denon('192.168.2.251');
const Options = require('./lib/options');

denon
  .connect()
  .then(() => {
    return denon.getVolume();
  })
  .then((result) => {
    console.log(result);
    return denon.getMaxVolume();
  })
  .then((result) => {
    console.log(result);
    return denon.getInput();
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
