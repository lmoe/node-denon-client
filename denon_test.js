const Denon = require('./lib/denon');
const denon = new Denon('192.168.2.252');
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
    console.log("K")
    console.log(error);
  });

/*    return denon.getVolume();
  })
  .then((result) => {
    console.log(result);

    return denon.getInput();
  })
  .then((result) => {
    console.log(result);

    return denon.getMute();
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  })*/
