'use strict';

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
* The Sattalite attribute.
*
* @default SAT/CBL
* @property {string} Sattalite
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
 * The Aux2 attribute.
 * 
 * @default AUX2
 * @property {string} Aux2
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
 * The MPlay attribute.
 * 
 * @default MPLAY
 * @property {string} MPlay
 */

/**
 * The MXPort attribute.
 * 
 * @default MXPORT
 * @property {string} MXPort
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
    Sattalite: 'SAT/CBL',
    Cable: 'SAT/CBL',
    MediaPlayer: 'SMPLAY',
    Game: 'GAME',
    Aux1: 'AUX1',
    Aux2: 'AUX2',
    MPlay: 'MPLAY',
    MXPort: 'MXPORT',
    Net: 'NET',
    IPod: 'USB/IPOD',
    USB: 'USB',   
    VDP: 'VDP',    
    Status: '?',
    Base: 'SI'
};

module.exports = InputOptions;
