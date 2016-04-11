'use strict';

const _ = require('lodash');

/**
 * The input options
 *
 * @class InputOptions
 */

/**
* The CD attribute.
*
* @default CD
* @property {string} CD
*/

/**
* The Tuner attribute.
*
* @default TUNER
* @property {string} Tuner
*/

/**
* The DVD attribute.
*
* @default DVD
* @property {string} DVD
*/

/**
* The BD attribute.
*
* @default BD
* @property {string} BD
*/

/**
* The TV attribute.
*
* @default TV
* @property {string} TV
*/

/**
* The Sattelite attribute.
*
* @default SAT/CBL
* @property {string} Sattelite
*/

/**
* The Cable attribute.
*
* @default SAT/CBL
* @property {string} Cable
*/

/**
* The MediaPlayer attribute.
*
* @default SMPLAY
* @property {string} MediaPlayer
*/

/**
* The Game attribute.
*
* @default GAME
* @property {string} Game
*/

/**
* The Aux1 attribute.
*
* @default AUX1
* @property {string} Aux1
*/

/**
* The Net attribute.
*
* @default NET
* @property {string} Net
*/

/**
* The USB attribute.
*
* @default USB
* @property {string} USB
*/

/**
* The IPod attribute.
*
* @default USB/IPOD
* @property {string} IPod
*/

/**
* The Status attribute.
*
* @default ?
* @property {string} Status
*/

/**
* The Base attribute.
*
* @default SI
* @private
* @property {string} Base
*/

const InputOptions = {
    CD: 'CD',
    Tuner: 'TUNER',
    DVD: 'DVD',
    BD: 'BD',
    TV: 'TV',
    Sattelite: 'SAT/CBL',
    Cable: 'SAT/CBL',
    MediaPlayer: 'SMPLAY',
    Game: 'GAME',
    Aux1: 'AUX1',
    Net: 'NET',
    IPod: 'USB/IPOD',
    USB: 'USB',    
    Status: '?',
    Base: 'SI'
};

module.exports = InputOptions;
