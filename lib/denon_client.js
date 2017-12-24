'use strict';

const Promise = require('bluebird');
const _ = require('lodash');

const Connection = require('./connection');
const Options = require('./options');
const DenonRegex = require('./denon_regex');
const transformers = require('./transformers');

/**
 * The Denon AVR RPC class.
 *
 * @class DenonClient
 * @extends EventEmitter
 */
class DenonClient extends Connection {
  /**
   * Initializes the telnet connection and sets up events.
   *
   * @constructor
   * @param  {string} host [The Denon AVR address]
   * @param  {number} port [The Denon AVR port, default 23]

   */
  constructor(host,port=23) {
    super(host,port);

    this.regExTable = {
      'masterVolume': {
        regEx: /(?:(MV))(?:(\d{2,3}))\r/,
        /**
         * @event masterVolumeChanged
         * @param {object} volume The current volume
         */
        emit: 'masterVolumeChanged',
        transform: transformers.volumeToHumanTransform
      },
      'masterVolumeMax': {
        regEx: /(?:(MVMAX ))(?:(\d{2,3}))\r/,
        /**
         * @event masterVolumeMaxChanged
         * @param {object} maxVolume The maximal volume
         */
        emit: 'masterVolumeMaxChanged',
        transform: transformers.volumeToHumanTransform
      },
      'mute': {
        regEx: DenonRegex.constructStatusChangedRegex(Options.MuteOptions),
        /**
         * @event muteChanged
         * @param {MuteOptions} mute The current mute status
         */
        emit: 'muteChanged'
      },
      'input': {
        regEx: DenonRegex.constructStatusChangedRegex(Options.InputOptions),
        /**
         * @event inputChanged
         * @param {InputOptions} input The current input status
         */
        emit: 'inputChanged'
      },
      'power': {
        regEx: DenonRegex.constructStatusChangedRegex(Options.PowerOptions),
        /**
         * @event powerChanged
         * @param {PowerOptions} power The current power status
         */
        emit: 'powerChanged'
      },
      'surround': {
        regEx: DenonRegex.constructStatusChangedRegex(Options.SurroundOptions),
        /**
         * @event surroundChanged
         * @param {SurroundOptions} surround The current surround status
         */
        emit: 'surroundChanged'
      },
      'displayDim': {
        regEx: DenonRegex.constructStatusChangedRegex(Options.DisplayDimOptions),
        /**
         * @event displayDimChanged
         * @param {DisplayDimOptions} displayDim The current display dim status
         */
        emit: 'displayDimChanged'
      },
      'zone2': {
        regEx: DenonRegex.constructStatusChangedRegex(Options.Zone2Options),
        /**
         * @event zone2Changed
         * @param {Zone2Options} zone2Status The current display dim status
         */
        emit: 'zone2Changed'
      }
    };

    this.on('data', (data) => {
      this._onData(data);
    });

    // Tiny hack. When nothing listens to the error event,
    // the 'once' handler in the connect function won't work.
    // You are still able to grab the error event from the outside.
    this.on('error', (error) => {});
  }

  getEvent(key)
  {
    if (typeof this.regExTable[key] !== 'undefined') {
      return this.regExTable[key].emit;
    } else {
      return undefined;
    }
  }

  /**
   * Does the RegEx magic.
   *
   * @method _applyRegex
   * @private
   * @param  {[string]} data  [The incoming data]
   * @return {[string|undefined]} [Response or undefined]
   */
  _applyRegex(data) {
    //const expression = new RegExp(regEx);
    const keys = _(this.regExTable).keys();
    const matches = [];

    _(keys).each((key) => {

      const handler = this.regExTable[key];
      const match = data.match(handler.regEx);

      if (match != null) {
        const matchResult = handler;

        // If the event hook has a transform method call it before applying the result value
        if (matchResult.transform) {
          matchResult.value = matchResult.transform(match[2]);
        } else {

          matchResult.value = match[2];
        }

        matches.push(matchResult);
      }
    });

    return matches;
  }

  /**
   * Receives the incoming data. Does some RegEx magic.
   * Calls the defined events and resolves promises.
   *
   * @method _onData
   * @private
   * @param  {[string]} data [The incoming data]
   */
  _onData(data) {
    if (typeof data === 'string') {
      const results = this._applyRegex(data);

      results.forEach((result) => {

        this.emit(result.emit, result.value);
      });
    }
  }

  /**
   * Sends a command to the Denon AVR
   *
   * @method sendCommand
   * @param  {string} command   [The command]
   * @param  {string} parameter [The parameter]
   * @param  {number} timeout [The length of time in ms to wait for a response]
   * @return {Promise} [A response]
   */
  sendCommand(command, parameter, hook, timeout = 10*1000) {
    const commandPromise = new Promise((resolve) => {

      if (typeof hook === 'string') {
        this.once(hook, (result) => {
          resolve(result);
        });
      }

      return this
        .write(`${command}${parameter}`)
        .then((result) => {
          console.log('denon result: ', result);
          if (typeof hook === 'undefined') {
            resolve();
          }
        });
    });

    const timeoutPromise = this.timeout(timeout);

    return Promise.race([commandPromise, timeoutPromise]);
  }

  timeout(milliseconds) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const timeoutRejectionError = new Error(`Timeout out after ${milliseconds} ms.`);
        reject(timeoutRejectionError);
      }, milliseconds); // Wait ms then resolve
    });
  }

  /**
   * Sets the volume of the Denon AVR.
   * Use {VolumeOptions} or a number from 0-98.
   *
   * 80=80(0dB), 00=-0(--dB)(MIN)
   * VolumeOptions.Up / VolumeOptions.Down
   *
   * @method setVolume
   * @param {VolumeOptions|number} volumeOptions [The volume option]
   * @return {Promise} [A response]
   */
  setVolume(volumeOptions) {

    const transformedVolume = transformers.volumeToAvrTransform(volumeOptions);

    return this.sendCommand('MV', transformedVolume);
  }

  /**
   * Returns the current Denon AVR volume.
   *
   * @method getVolume
   * @return {Promise} [A response]
   */
  getVolume() {

    return this.sendCommand('MV', Options.VolumeOptions.Status,
      this.getEvent('masterVolume'));
  }

  /**
   * Returns the current Denon AVR volume.
   *
   * @method getVolume
   * @return {Promise} [A response]
   */
  getMaxVolume() {

    return this.sendCommand('MV', Options.VolumeOptions.Status,
      this.getEvent('masterVolumeMax'));
  }

  /**
   * Sets the power mode of the Denon AVR. (On / Standby).
   * Use {PowerOptions}.
   *
   * @method setPower
   * @param {PowerOptions} powerOptions [The power option]
   * @return {Promise} [A response]
   */
  setPower(powerOptions) {

    return this.sendCommand('PW', powerOptions,
      this.getEvent('power'));
  }

  /**
   * Returns the current power status of the Denon AVR.
   *
   * @method getPower
   * @return {Promise} [A response]
   */
  getPower() {

    return this.sendCommand('PW', Options.PowerOptions.Status,
      this.getEvent('power'));
  }

  /**
   * Sets the zone 2 state of the Denon AVR. (On / Off).
   * Use {Zone2Options}.
   *
   * @method setZone2
   * @param {Zone2Options} zone2Options [The zone2 option]
   * @return {Promise} [A response]
   */
  setZone2(zone2Options) {

    return this.sendCommand('Z2', zone2Options,
      this.getEvent('zone2'));
  }

  /**
   * Returns the current zone 2 status of the Denon AVR.
   *
   * @method getZone2
   * @return {Promise} [A response]
   */
  getZone2() {

    return this.sendCommand('Z2', Options.Zone2Options.Status,
      this.getEvent('zone2'));
  }

  /**
   * Sets the mute status of the Denon AVR. (On / Off).
   * Use {MuteOptions}.
   *
   * @method setMute
   * @param {MuteOptions} muteOptions [The mute option]
   * @return {Promise} [A response]
   */
  setMute(muteOptions) {

    return this.sendCommand('MU', muteOptions,
      this.getEvent('mute'));
  }

  /**
   * Returns the current mute status of the Denon AVR.
   *
   * @method getMute
   * @return {Promise} [A response]
   */
  getMute() {

    return this.sendCommand('MU', Options.MuteOptions.Status,
      this.getEvent('mute'));
  }

  /**
   * Sets the active input of the Denon AVR. (TV, DVD, ...).
   * Use {InputOptions}.
   *
   * @method setInput
   * @param {InputOptions} inputOptions [The input option]
   * @return {Promise} [A response]
   */
  setInput(inputOptions) {

    return this.sendCommand('SI', inputOptions,
      this.getEvent('input'));
  }

  /**
   * Returns the current active input source (TV, DVD, ...) of the Denon AVR.
   *
   * @method getInput
   * @return {Promise} [A response]
   */
  getInput() {

    return this.sendCommand('SI', Options.InputOptions.Status,
      this.getEvent('input'));
  }

  /**
   * Sets the surround mode of the Denon AVR. (Dolby, Stereo, ...).
   * Use {SurroundOptions}.
   *
   * @method setSurround
   * @param {SurroundOptions} surroundOptions [The surround option]
   * @return {Promise} [A response without any data]
   */
  setSurround(surroundOptions) {

    // Setting the surround option does not seem to return anything useful.
    return this.sendCommand('MS', surroundOptions);
  }

  /**
   * Returns the current surround mode of the Denon AVR.
   *
   * @method getSurround
   * @return {Promise} [A response]
   */
  getSurround() {

    return this.sendCommand('MS', Options.SurroundOptions.Status,
      this.getEvent('surround'));
  }

  /**
   * Returns the brightness level of the display
   *
   * @method getBrightness
   * @return {Promise}
   */
  getBrightness() {

    return this.sendCommand('SSDIM', Options.DisplayDimOptions.Status,
      this.getEvent('displayDim'));
  }

  /**
   * Sets the brightness level of the display
   *
   * @method setBrightness
   * @param {DisplayDimOptions} brightnessLevel [Off, Low, Mid, High]
   * @return {Promise}
   */
  setBrightness(brightnessLevel) {

    return this.sendCommand('SSDIM', brightnessLevel,
      this.getEvent('displayDim'));
  }
}

module.exports = DenonClient;
